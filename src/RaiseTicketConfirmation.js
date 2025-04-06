import React from "react";
import { useParams } from "react-router-dom";

const RaiseTicketConfirmation = () => {
const {ticketId} = useParams();
const {fullName} = useParams();
return(
    <div>
   Dear ${fullName} Greetings!!. Ticket has been submitted successfully! Your reference number is ${ticketId}.
    </div>
);
};

export default RaiseTicketConfirmation