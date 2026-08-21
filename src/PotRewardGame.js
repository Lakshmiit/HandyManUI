import React, { useEffect, useState, useCallback } from "react";
import axios from "axios";
import { showToast } from "./toast";

// ================= API URLS =================

// Change this to localhost if you are testing locally
const API_BASE =
  "https://lmartapiv1-fxcyd2b4btacgsav.westus2-01.azurewebsites.net/api";

const GET_OFFER_TRANSACTION_URL =
  `${API_BASE}/OffersTransactions/GetOfferTransactionByUserId`;

const CREATE_OFFER_TRANSACTION_URL =
  `${API_BASE}/OffersTransactions/UploadOffersTransactionsDetails`;

const UPDATE_OFFER_TRANSACTION_URL =
  `${API_BASE}/OffersTransactions/UpdateOffersTransactionsDetails`;

// ================= REWARDS =================

const REWARD_POOL = [5, 10, 15];

const shuffledRewards = () => {
  const arr = [...REWARD_POOL];

  for (let i = arr.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));

    [arr[i], arr[j]] = [arr[j], arr[i]];
  }

  return arr.map((amount, idx) => ({
    id: idx,
    amount,
  }));
};

// ================= DAILY GAME LOCK =================

const todayKey = () => new Date().toISOString().slice(0, 10);

const lockKey = (userId) =>
  `potRewardGame_${userId}_${todayKey()}`;

// ================= CREDIT WALLET =================

async function creditWallet(userId, amount) {
  try {
    console.log("🎁 Pot Reward Amount:", amount);

    // ---------------------------------------
    // GET EXISTING WALLET TRANSACTION
    // ---------------------------------------

    const response = await axios.get(
      GET_OFFER_TRANSACTION_URL,
      {
        params: {
          userId,
        },
      }
    );

    const data = response.data;

    console.log(
      "📦 Existing Offer Transaction:",
      data
    );

    // ---------------------------------------
    // NO RECORD -> CREATE NEW WALLET
    // ---------------------------------------

    if (!data || data.length === 0) {
      const payload = {
        id: "string",
        UserId: userId,
        CreatedDate: new Date().toISOString(),
        UpdatedDate: new Date().toISOString(),
        TicketId: "",
        TotalWalletAmount: String(amount),
        AvailedAmount: "0",
        RemainingAmount: String(amount),
      };

      console.log(
        "📤 Creating Offer Transaction:",
        payload
      );

      await axios.post(
        CREATE_OFFER_TRANSACTION_URL,
        payload
      );

      console.log(
        `✅ New wallet created with ₹${amount}`
      );

      return Number(amount);
    }

    // ---------------------------------------
    // EXISTING RECORD
    // ---------------------------------------

    const existing = data[0];

    const existingWalletAmount = Number(
      existing.remainingAmount || 0
    );

    const existingTotalWalletAmount = Number(
      existing.totalWalletAmount || 0
    );

    const existingAvailedAmount = Number(
      existing.availedAmount || 0
    );

    const rewardAmount = Number(amount);

    // ---------------------------------------
    // ADD POT REWARD TO EXISTING WALLET
    //
    // Example:
    //
    // Existing Wallet = 50
    // Reward = 15
    //
    // Updated Wallet = 65
    // ---------------------------------------

    const updatedWalletAmount =
      existingWalletAmount + rewardAmount;

    const updatedTotalWalletAmount =
      existingTotalWalletAmount + rewardAmount;

    // ---------------------------------------
    // PUT PAYLOAD
    // ---------------------------------------

    const offersTransactionPayload = {
      id: existing.id,

      userId: userId,

      createdDate: existing.createdDate,

      updatedDate: new Date().toISOString(),

      totalWalletAmount: String(
        updatedTotalWalletAmount
      ),

      // Do not change spent/availed amount
      availedAmount: String(
        existingAvailedAmount
      ),

      // Current wallet amount
      remainingAmount: String(
        updatedWalletAmount
      ),
    };

    console.log(
      "📤 PUT Offers Transaction Payload:",
      offersTransactionPayload
    );

    console.log(
      "📤 PUT URL:",
      `${UPDATE_OFFER_TRANSACTION_URL}/${existing.id}`
    );

    // ---------------------------------------
    // UPDATE WALLET
    // ---------------------------------------

    const updateResponse = await axios.put(
      `${UPDATE_OFFER_TRANSACTION_URL}/${existing.id}`,
      offersTransactionPayload
    );

    console.log(
      "✅ Wallet Updated Successfully:",
      updateResponse.data
    );

    console.log(`
      💰 Previous Wallet: ₹${existingWalletAmount}
      🎁 Pot Reward: ₹${rewardAmount}
      💵 Updated Wallet: ₹${updatedWalletAmount}
    `);

    // Return latest wallet amount
    return updatedWalletAmount;

  } catch (error) {
    console.error(
      "❌ Pot Reward Wallet Error:",
      error.response?.data || error.message
    );

    throw error;
  }
}

// ================= POT REWARD GAME =================

const PotRewardGame = ({
  userId,
  onWalletCredited,
}) => {
  const [pots, setPots] = useState(() =>
    shuffledRewards()
  );

  const [crackingId, setCrackingId] =
    useState(null);

  const [revealed, setRevealed] =
    useState(false);

  const [wonAmount, setWonAmount] =
    useState(null);

  const [crediting, setCrediting] =
    useState(false);

  const [alreadyPlayed, setAlreadyPlayed] =
    useState(false);

  // ==========================================
  // CHECK IF USER ALREADY PLAYED TODAY
  // ==========================================

  useEffect(() => {
    if (!userId) return;

    try {
      const saved = localStorage.getItem(
        lockKey(userId)
      );

      if (saved) {
        const parsed = JSON.parse(saved);

        setPots(
          parsed.pots || shuffledRewards()
        );

        setWonAmount(
          parsed.wonAmount ?? null
        );

        setRevealed(true);

        setAlreadyPlayed(true);
      } else {
        // Reset game if user changes
        setPots(shuffledRewards());
        setWonAmount(null);
        setRevealed(false);
        setAlreadyPlayed(false);
        setCrackingId(null);
      }
    } catch (error) {
      console.error(
        "Error reading pot reward:",
        error
      );
    }
  }, [userId]);

  // ==========================================
  // BREAK POT
  // ==========================================

  const handleBreakPot = useCallback(
    async (pot) => {
      if (
        !userId ||
        alreadyPlayed ||
        crediting ||
        crackingId !== null
      ) {
        return;
      }

      // Start animation
      setCrackingId(pot.id);

      // Wait for hammer animation
      setTimeout(async () => {
        setCrediting(true);

        try {
          // --------------------------------
          // CREDIT POT AMOUNT TO WALLET
          // --------------------------------

          const newRemaining =
            await creditWallet(
              userId,
              pot.amount
            );

          // --------------------------------
          // SHOW REWARD
          // --------------------------------

          setWonAmount(pot.amount);

          setRevealed(true);

          setAlreadyPlayed(true);

          // --------------------------------
          // SAVE DAILY LOCK
          // --------------------------------

          try {
            localStorage.setItem(
              lockKey(userId),
              JSON.stringify({
                pots,
                wonAmount: pot.amount,
              })
            );
          } catch (error) {
            console.error(
              "Local storage error:",
              error
            );
          }

          // --------------------------------
          // SUCCESS MESSAGE
          // --------------------------------

          showToast(
            `🎉 You won ₹${pot.amount}! Your wallet balance is now ₹${newRemaining}.`
          );

          // --------------------------------
          // SEND UPDATED WALLET TO PARENT
          // --------------------------------

          if (onWalletCredited) {
            onWalletCredited(newRemaining);
          }

        } catch (error) {
          console.error(
            "Pot reward crediting failed:",
            error
          );

          showToast(
            "Couldn't credit your reward. Please try again."
          );

          // Allow retry
          setCrackingId(null);

        } finally {
          setCrediting(false);

          setCrackingId(null);
        }
      }, 750);
    },
    [
      userId,
      alreadyPlayed,
      crediting,
      crackingId,
      pots,
      onWalletCredited,
    ]
  );

  // ==========================================
  // NO USER
  // ==========================================

  if (!userId) {
    return null;
  }

  // ==========================================
  // UI
  // ==========================================

  return (
    <div
      className="shadow-lg rounded-4 p-3 mb-2"
      style={{
        background:
          "radial-gradient(circle at 30% 20%, #fff8e1 0%, #ffe8b3 60%, #ffdd94 100%)",
        border: "2px solid #ffc107",
        textAlign: "center",
        position: "relative",
        overflow: "hidden",
      }}
    >
      {/* ================= ANIMATIONS ================= */}

      <style>{`

        /* ---------------- Hammer ---------------- */

        @keyframes hammerSwing {
          0% {
            transform: rotate(-55deg) translateY(0);
            opacity: 1;
          }

          45% {
            transform: rotate(-55deg) translateY(0);
            opacity: 1;
          }

          60% {
            transform: rotate(10deg) translateY(2px);
            opacity: 1;
          }

          70% {
            transform: rotate(18deg) translateY(4px);
            opacity: 1;
          }

          85% {
            transform: rotate(10deg) translateY(1px);
            opacity: 1;
          }

          100% {
            transform: rotate(-25deg) translateY(0);
            opacity: 0;
          }
        }

        .hammer-swing {
          animation:
            hammerSwing 0.75s
            cubic-bezier(.36,.07,.19,.97)
            forwards;

          transform-origin: 80% 15%;
        }

        @keyframes hammerIdle {
          0%,
          100% {
            transform:
              rotate(-32deg)
              translateY(0);
          }

          50% {
            transform:
              rotate(-40deg)
              translateY(-2px);
          }
        }

        .hammer-idle {
          animation:
            hammerIdle 1.6s
            ease-in-out
            infinite;

          transform-origin: 80% 15%;
        }


        /* ---------------- Pot Impact ---------------- */

        @keyframes potImpact {

          0% {
            transform:
              scale(1)
              rotate(0deg);
          }

          14% {
            transform:
              scale(0.94)
              rotate(-3deg);
          }

          22% {
            transform:
              scale(1.05)
              rotate(4deg);
          }

          30% {
            transform:
              scale(0.96)
              rotate(-5deg);
          }

          40% {
            transform:
              scale(1.04)
              rotate(5deg);
          }

          50% {
            transform:
              scale(0.9)
              rotate(-4deg);
          }

          62% {
            transform:
              scale(1.1)
              rotate(2deg);
          }

          75% {
            transform:
              scale(0.3)
              rotate(8deg);

            opacity: 0.4;
          }

          100% {
            transform:
              scale(0)
              rotate(15deg);

            opacity: 0;
          }
        }

        .pot-impact {
          animation:
            potImpact 0.75s
            cubic-bezier(.36,.07,.19,.97)
            forwards;
        }


        /* ---------------- Crack ---------------- */

        @keyframes crackFlash {

          0% {
            opacity: 0;
            transform: scale(0.6);
          }

          55% {
            opacity: 0;
          }

          65% {
            opacity: 1;
            transform: scale(1.1);
          }

          100% {
            opacity: 0;
            transform: scale(1.3);
          }
        }

        .crack-flash {
          animation:
            crackFlash 0.75s
            ease-out
            forwards;
        }


        /* ---------------- Shatter ---------------- */

        @keyframes shatterPiece {

          0% {
            transform:
              translate(0,0)
              rotate(0deg)
              scale(1);

            opacity: 1;
          }

          100% {
            transform:
              translate(var(--dx), var(--dy))
              rotate(var(--rot))
              scale(0.3);

            opacity: 0;
          }
        }

        .shatter-piece {
          animation:
            shatterPiece 0.6s
            ease-out
            forwards;

          animation-delay: 0.5s;
        }


        /* ---------------- Coins ---------------- */

        @keyframes coinBurst {

          0% {
            transform:
              translate(-50%, 0)
              scale(0)
              rotate(0deg);

            opacity: 0;
          }

          35% {
            transform:
              translate(
                calc(-50% + var(--cx)),
                var(--cy)
              )
              scale(1.25)
              rotate(var(--crot));

            opacity: 1;
          }

          100% {
            transform:
              translate(
                calc(-50% + var(--cx)),
                calc(var(--cy) - 10px)
              )
              scale(1)
              rotate(var(--crot));

            opacity: 1;
          }
        }

        .coin-burst-piece {
          position: absolute;
          left: 50%;
          bottom: 38px;
          font-size: 20px;

          animation:
            coinBurst 0.6s
            cubic-bezier(.17,.67,.53,1.4)
            forwards;
        }


        @keyframes coinFloat {

          0%,
          100% {
            transform:
              translateY(0);
          }

          50% {
            transform:
              translateY(-4px);
          }
        }

        .coin-float {
          animation:
            coinFloat 1.6s
            ease-in-out
            infinite;
        }


        /* ---------------- Amount ---------------- */

        @keyframes amountPop {

          0% {
            transform: scale(0);
            opacity: 0;
          }

          65% {
            transform: scale(1.25);
            opacity: 1;
          }

          100% {
            transform: scale(1);
            opacity: 1;
          }
        }

        .amount-pop {
          animation:
            amountPop 0.4s
            ease-out
            forwards;
        }


        /* ---------------- Winner Glow ---------------- */

        @keyframes glowPulse {

          0%,
          100% {
            box-shadow:
              0 0 0 0
              rgba(255,193,7,0.5);
          }

          50% {
            box-shadow:
              0 0 0 8px
              rgba(255,193,7,0);
          }
        }

        .winner-glow {
          animation:
            glowPulse 1.6s
            ease-in-out
            infinite;
        }

      `}</style>

      {/* ================= HEADING ================= */}

      <h6
        className="fw-bold mb-1"
        style={{
          letterSpacing: "0.5px",
          color: "#7a4e00",
        }}
      >
        🏺 Break a Pot, Win Instant Cashback!
      </h6>

      <p
        className="text-muted mb-3"
        style={{
          fontSize: "12px",
        }}
      >
        {alreadyPlayed
          ? "You've broken today's pot — come back tomorrow for another!"
          : "Tap any pot — win ₹5, ₹10 or ₹15. Amount goes directly to your wallet."}
      </p>

      {/* ================= POTS ================= */}

      <div
        className="d-flex justify-content-center align-items-end"
        style={{
          gap: "22px",
        }}
      >
        {pots.map((pot) => {
          const isBreaking =
            crackingId === pot.id;

          const showReward =
            revealed;

          const isWinner =
            revealed &&
            wonAmount === pot.amount;

          const clickable =
            !alreadyPlayed &&
            !crediting &&
            crackingId === null;

          return (
            <div
              key={pot.id}
              onClick={() =>
                clickable &&
                handleBreakPot(pot)
              }
              className={
                isWinner && showReward
                  ? "winner-glow rounded-circle"
                  : ""
              }
              style={{
                cursor:
                  clickable
                    ? "pointer"
                    : "default",

                width: "84px",

                position: "relative",

                paddingTop: "26px",
              }}
            >

              {/* Hammer */}

              {!alreadyPlayed &&
                !revealed && (
                  <span
                    className={
                      isBreaking
                        ? "hammer-swing"
                        : "hammer-idle"
                    }
                    style={{
                      position: "absolute",
                      top: "-6px",
                      right: "6px",
                      fontSize: "26px",
                      zIndex: 3,
                      display: "inline-block",
                    }}
                  >
                    🔨
                  </span>
                )}

              {/* Pot Area */}

              <div
                style={{
                  height: "58px",

                  display: "flex",

                  alignItems: "flex-end",

                  justifyContent: "center",

                  position: "relative",
                }}
              >

                {/* Crack */}

                {isBreaking && (
                  <span
                    className="crack-flash"
                    style={{
                      position: "absolute",
                      fontSize: "40px",
                      zIndex: 2,
                    }}
                  >
                    💥
                  </span>
                )}

                {/* Pot */}

                {!(
                  showReward &&
                  !isBreaking
                ) && (
                  <span
                    className={
                      isBreaking
                        ? "pot-impact"
                        : ""
                    }
                    style={{
                      fontSize: "46px",

                      lineHeight: "1",

                      display: "inline-block",
                    }}
                  >
                    🏺
                  </span>
                )}

                {/* Shatter Pieces */}

                {isBreaking &&
                  ["-1", "0", "1"].map(
                    (n, i) => (
                      <span
                        key={i}
                        className="shatter-piece"
                        style={{
                          position: "absolute",

                          fontSize: "14px",

                          "--dx":
                            `${Number(n) * 26}px`,

                          "--dy":
                            `${-18 - i * 6}px`,

                          "--rot":
                            `${Number(n) * 90}deg`,
                        }}
                      >
                        🟤
                      </span>
                    )
                  )}

                {/* Coins */}

                {showReward &&
                  !isBreaking && (
                    <>
                      {[
                        {
                          cx: "-22px",
                          cy: "-30px",
                          crot: "-15deg",
                        },
                        {
                          cx: "0px",
                          cy: "-42px",
                          crot: "10deg",
                        },
                        {
                          cx: "22px",
                          cy: "-28px",
                          crot: "20deg",
                        },
                      ].map(
                        (coin, i) => (
                          <span
                            key={i}
                            className="coin-burst-piece"
                            style={{
                              "--cx":
                                coin.cx,

                              "--cy":
                                coin.cy,

                              "--crot":
                                coin.crot,

                              animationDelay:
                                `${i * 0.06}s`,
                            }}
                          >
                            🪙
                          </span>
                        )
                      )}
                    </>
                  )}

              </div>

              {/* ================= REWARD AMOUNT ================= */}

              <div
                className={
                  showReward
                    ? "amount-pop"
                    : ""
                }
                style={{
                  marginTop: "4px",

                  fontSize: "14px",

                  fontWeight: "bold",

                  color:
                    isWinner
                      ? "#28a745"
                      : "#888",

                  minHeight: "18px",
                }}
              >
                {showReward
                  ? `₹${pot.amount}`
                  : ""}
              </div>

              {/* Winner Text */}

              {isWinner && (
                <div
                  style={{
                    fontSize: "10px",

                    color: "#28a745",

                    fontWeight: 600,
                  }}
                >
                  Your reward!
                </div>
              )}

            </div>
          );
        })}
      </div>

      {/* ================= LOADING ================= */}

      {crediting && (
        <p
          className="mt-2 mb-0"
          style={{
            fontSize: "12px",
          }}
        >
          🪙 Adding your reward to wallet...
        </p>
      )}

    </div>
  );
};

export default PotRewardGame;