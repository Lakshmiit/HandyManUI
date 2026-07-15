// utils/auth.js
const STORAGE_KEY = "loginData";
const EXPIRY_DAYS = 60;
const PROD_ACTIVE_USERS_API_BASE = "https://handyman-profile-msg-20260712.azurewebsites.net";

const resolveActiveUsersApiBase = () => {
  const configuredBase = String(process.env.REACT_APP_ACTIVE_USERS_API_BASE || "").trim();
  if (configuredBase) {
    return configuredBase;
  }

  if (typeof window !== "undefined") {
    const hostname = window.location.hostname || "";
    if (hostname === "localhost" || hostname === "127.0.0.1") {
      return "http://localhost:8080";
    }
  }

  return PROD_ACTIVE_USERS_API_BASE;
};

const ACTIVE_USERS_API_BASE = resolveActiveUsersApiBase();

export const setLoginData = (newUserId) => {
  const now = new Date();
  const expiry = now.getTime() + EXPIRY_DAYS * 24 * 60 * 60 * 1000;

  const data = {
    newUserId,
    expiry,
  };
  localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
};

export const getLoginData = () => {
  const item = localStorage.getItem(STORAGE_KEY);
  if (!item) return null;

  const data = JSON.parse(item);
  const now = new Date();

  if (now.getTime() > data.expiry) {
    localStorage.removeItem(STORAGE_KEY);
    return null;
  }

  return data.newUserId;
};

export const clearLoginData = () => {
  localStorage.removeItem(STORAGE_KEY);
};

export const getActiveUsersApiBase = () => ACTIVE_USERS_API_BASE;

export const getActiveUsersEndpoint = (path) => {
  const normalizedPath = String(path || "").startsWith("/") ? path : `/${path}`;
  return `${ACTIVE_USERS_API_BASE}${normalizedPath}`;
};

export const getNotificationState = () => {
  if (typeof window === "undefined" || !("Notification" in window)) {
    return {
      permissionGranted: "unsupported",
      pushEnabled: false,
      notificationsEnabled: false,
      hasSubscription: false,
    };
  }

  const permissionGranted = window.Notification.permission;
  const pushEnabled = permissionGranted === "granted";

  return {
    permissionGranted,
    pushEnabled,
    notificationsEnabled: pushEnabled,
    hasSubscription: pushEnabled,
  };
};

const getClientDeviceDetails = () => {
  const userAgent = typeof navigator !== "undefined" ? navigator.userAgent || "" : "";
  const platform = typeof navigator !== "undefined" ? navigator.platform || "" : "";
  const language = typeof navigator !== "undefined" ? navigator.language || "" : "";

  return {
    device: platform || "web",
    browser: userAgent,
    metadata: {
      platform,
      language,
      userAgent,
      pageUrl: typeof window !== "undefined" ? window.location.href : "",
      path: typeof window !== "undefined" ? window.location.pathname : "",
    },
  };
};

const buildIdentityPayload = ({ userId, mobileNumber, name, fullName, location }) => ({
  userId: String(userId || "").trim() || undefined,
  mobileNumber: String(mobileNumber || "").trim() || undefined,
  name: String(name || fullName || "").trim() || undefined,
  fullName: String(fullName || name || "").trim() || undefined,
  location: String(location || "").trim() || undefined,
});

const getJsonPayload = async (response) => {
  const payload = await response.json().catch(() => null);

  if (!response.ok) {
    throw new Error(
      payload?.message || payload?.error || `Active user API failed with status ${response.status}`
    );
  }

  return payload;
};

export const postActiveUserEvent = async (path, payload) => {
  const response = await fetch(getActiveUsersEndpoint(path), {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(payload),
  });

  return getJsonPayload(response);
};

export const trackLoginActivity = async ({
  userId,
  mobileNumber,
  name,
  fullName,
  location,
  source,
  eventType = "login",
}) => {
  const identityPayload = buildIdentityPayload({
    userId,
    mobileNumber,
    name,
    fullName,
    location,
  });

  if (!identityPayload.userId && !identityPayload.mobileNumber) {
    return null;
  }

  const clientDetails = getClientDeviceDetails();
  const notificationState = getNotificationState();

  return postActiveUserEvent("/api/log-login", {
    ...identityPayload,
    eventType,
    loginAt: new Date().toISOString(),
    source: source && typeof source === "object" ? source : null,
    ...clientDetails,
    ...notificationState,
  }).catch((error) => {
    console.error("Failed to track login activity", error);
    return null;
  });
};

export const registerInstallActivity = async ({
  userId,
  mobileNumber,
  name,
  fullName,
  location,
  source,
}) => {
  const identityPayload = buildIdentityPayload({
    userId,
    mobileNumber,
    name,
    fullName,
    location,
  });

  if (!identityPayload.userId && !identityPayload.mobileNumber) {
    return null;
  }

  const clientDetails = getClientDeviceDetails();
  const notificationState = getNotificationState();

  return postActiveUserEvent("/api/push/register-install", {
    ...identityPayload,
    lastSeenAt: new Date().toISOString(),
    source: source && typeof source === "object" ? source : null,
    ...clientDetails,
    ...notificationState,
  }).catch((error) => {
    console.error("Failed to register install activity", error);
    return null;
  });
};

export const trackUserActivity = async ({
  userId,
  mobileNumber,
  name,
  fullName,
  location,
  source,
  eventType = "activity",
  action,
  sessionId,
  page,
  path,
  durationSeconds,
  activeSeconds,
  metadata,
}) => {
  const identityPayload = buildIdentityPayload({
    userId,
    mobileNumber,
    name,
    fullName,
    location,
  });

  if (!identityPayload.userId && !identityPayload.mobileNumber) {
    return null;
  }

  const clientDetails = getClientDeviceDetails();
  const notificationState = getNotificationState();

  return postActiveUserEvent("/api/activity-event", {
    ...identityPayload,
    eventType,
    action: String(action || "").trim() || undefined,
    sessionId: String(sessionId || "").trim() || undefined,
    page: String(page || "").trim() || undefined,
    path: String(path || "").trim() || undefined,
    durationSeconds: Number(durationSeconds || 0) || 0,
    activeSeconds: Number(activeSeconds || durationSeconds || 0) || 0,
    activityAt: new Date().toISOString(),
    source: source && typeof source === "object" ? source : null,
    metadata: metadata && typeof metadata === "object" ? metadata : null,
    ...clientDetails,
    ...notificationState,
  }).catch((error) => {
    console.error("Failed to track user activity", error);
    return null;
  });
};

export const fetchActiveUserSummary = async ({
  userId,
  mobileNumber,
  installId,
  status,
  search,
  startDateTime,
  endDateTime,
  activeSinceHours,
} = {}) => {
  const params = new URLSearchParams();
  if (userId) params.set("userId", String(userId));
  if (mobileNumber) params.set("mobileNumber", String(mobileNumber));
  if (installId) params.set("installId", String(installId));
  if (status) params.set("status", String(status));
  if (search) params.set("search", String(search));
  if (startDateTime) params.set("startDateTime", String(startDateTime));
  if (endDateTime) params.set("endDateTime", String(endDateTime));
  if (activeSinceHours) params.set("activeSinceHours", String(activeSinceHours));

  const response = await fetch(
    getActiveUsersEndpoint(`/api/user-activity-summary${params.toString() ? `?${params.toString()}` : ""}`)
  );
  const payload = await getJsonPayload(response);
  if (payload?.item) {
    return payload.item;
  }
  if (Array.isArray(payload?.items) && payload.items.length) {
    return payload.items[0];
  }
  return null;
};

export const fetchProfileMessages = async ({ userId, mobileNumber, installId } = {}) => {
  const params = new URLSearchParams();
  if (userId) params.set("userId", String(userId));
  if (mobileNumber) params.set("mobileNumber", String(mobileNumber));
  if (installId) params.set("installId", String(installId));

  const response = await fetch(
    getActiveUsersEndpoint(`/api/profile-messages${params.toString() ? `?${params.toString()}` : ""}`)
  );
  const payload = await getJsonPayload(response);
  return Array.isArray(payload?.items) ? payload.items : [];
};

export const fetchHelpRequests = async ({ userId, mobileNumber, installId, topic } = {}) => {
  const params = new URLSearchParams();
  if (userId) params.set("userId", String(userId));
  if (mobileNumber) params.set("mobileNumber", String(mobileNumber));
  if (installId) params.set("installId", String(installId));
  if (topic) params.set("topic", String(topic));

  const response = await fetch(
    getActiveUsersEndpoint(`/api/help-requests${params.toString() ? `?${params.toString()}` : ""}`)
  );
  const payload = await getJsonPayload(response);
  return Array.isArray(payload?.items) ? payload.items : [];
};

export const fetchHelpRequestThread = async ({ requestId } = {}) => {
  const normalizedRequestId = String(requestId || "").trim();

  if (!normalizedRequestId) {
    throw new Error("Help request id is required to load the conversation.");
  }

  const response = await fetch(
    getActiveUsersEndpoint(`/api/help-requests/${encodeURIComponent(normalizedRequestId)}`)
  );
  const payload = await getJsonPayload(response);
  return payload?.item || null;
};

export const fetchAdminHelpRequests = async ({ topic, status, search } = {}) => {
  const params = new URLSearchParams();
  params.set("adminView", "true");
  if (topic) params.set("topic", String(topic));
  if (status) params.set("status", String(status));
  if (search) params.set("search", String(search));

  const response = await fetch(
    getActiveUsersEndpoint(`/api/help-requests?${params.toString()}`)
  );
  const payload = await getJsonPayload(response);
  return Array.isArray(payload?.items) ? payload.items : [];
};

export const appendHelpRequestMessage = async ({
  requestId,
  userId,
  mobileNumber,
  installId,
  name,
  fullName,
  location,
  message,
  voiceNote,
  sentBy,
  role,
  topic,
  title,
  metadata,
  messageMetadata,
} = {}) => {
  const normalizedRequestId = String(requestId || "").trim();
  const normalizedMessage = String(message || "").trim();

  if (!normalizedRequestId) {
    throw new Error("Help request id is required to send a chat message.");
  }

  if (!normalizedMessage && !voiceNote) {
    throw new Error("Type a message or attach a voice note before sending.");
  }

  const identityPayload = buildIdentityPayload({
    userId,
    mobileNumber,
    name,
    fullName,
    location,
  });

  const response = await fetch(
    getActiveUsersEndpoint(`/api/help-requests/${encodeURIComponent(normalizedRequestId)}/messages`),
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        ...identityPayload,
        installId: String(installId || "").trim() || undefined,
        topic: String(topic || "").trim() || undefined,
        title: String(title || "").trim() || undefined,
        message: normalizedMessage || undefined,
        voiceNote: voiceNote && typeof voiceNote === "object" ? voiceNote : undefined,
        sentBy: String(sentBy || fullName || name || "User").trim() || "User",
        role: String(role || "user").trim() || "user",
        metadata: metadata && typeof metadata === "object" ? metadata : null,
        messageMetadata: messageMetadata && typeof messageMetadata === "object" ? messageMetadata : null,
      }),
    }
  );

  return getJsonPayload(response);
};

export const submitHelpRequestReply = async ({ requestId, adminReply, repliedBy } = {}) => {
  const normalizedRequestId = String(requestId || "").trim();
  const normalizedReply = String(adminReply || "").trim();

  if (!normalizedRequestId) {
    throw new Error("Help request id is required to send an admin reply.");
  }

  if (!normalizedReply) {
    throw new Error("Admin reply cannot be empty.");
  }

  const response = await fetch(getActiveUsersEndpoint(`/api/help-requests/${encodeURIComponent(normalizedRequestId)}/reply`), {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      adminReply: normalizedReply,
      repliedBy: String(repliedBy || "Admin").trim() || "Admin",
    }),
  });

  return getJsonPayload(response);
};

export const submitHelpRequest = async ({
  userId,
  mobileNumber,
  installId,
  name,
  fullName,
  location,
  topic,
  title,
  message,
  voiceNote,
  metadata,
  messageMetadata,
} = {}) => {
  const identityPayload = buildIdentityPayload({
    userId,
    mobileNumber,
    name,
    fullName,
    location,
  });

  if (!identityPayload.userId && !identityPayload.mobileNumber && !installId) {
    throw new Error("User identity is required to submit a help request.");
  }

  return postActiveUserEvent("/api/help-requests", {
    ...identityPayload,
    installId: String(installId || "").trim() || undefined,
    topic: String(topic || "other").trim() || "other",
    title: String(title || "").trim() || undefined,
    message: String(message || "").trim(),
    voiceNote: voiceNote && typeof voiceNote === "object" ? voiceNote : undefined,
    metadata: metadata && typeof metadata === "object" ? metadata : null,
    messageMetadata: messageMetadata && typeof messageMetadata === "object" ? messageMetadata : null,
    source: {
      channel: "profile-help-board",
      requestedAt: new Date().toISOString(),
    },
  });
};

export const requestNotificationPermission = async ({
  userId,
  mobileNumber,
  name,
  fullName,
  location,
} = {}) => {
  if (typeof window === "undefined" || !("Notification" in window)) {
    return "unsupported";
  }

  let permission = window.Notification.permission;
  if (permission !== "granted" && typeof window.Notification.requestPermission === "function") {
    permission = await window.Notification.requestPermission();
  }

  await registerInstallActivity({
    userId,
    mobileNumber,
    name,
    fullName,
    location,
    source: {
      channel: "notification-permission-request",
      requestedAt: new Date().toISOString(),
    },
  });

  return permission;
};
