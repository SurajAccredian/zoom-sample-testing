import { useEffect } from "react";
import { ZoomMtg } from "@zoom/meetingsdk";
import { useLocation } from "react-router-dom";
// Ensure you are using the correct version
// ZoomMtg.preLoadWasm();
// ZoomMtg.prepareJssdk();

const MeetingPage = () => {
  // Extract query parameters
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const meetingId = queryParams.get("meetingId");
  const password = queryParams.get("password");
  const sign = queryParams.get("signature");
  const name = queryParams.get("name");
  const email = queryParams.get("email");

  useEffect(() => {
    function startMeeting(signature) {
      document.getElementById("zmmtg-root").style.display = "block";
      console.log(signature);

      ZoomMtg.init({
        leaveUrl:  import.meta.env.VITE_ZOOM_FRONTEND_URL,
        patchJsMedia: true,
        leaveOnPageUnload: true,
        success: (success) => {
          console.log(success);

          ZoomMtg.join({
            signature: signature,
            sdkKey: import.meta.env.VITE_ZOOM_MEETING_SDK_KEY,
            meetingNumber: meetingId,
            passWord: password || "",
            userName: name || "Dummy User",
            userEmail: email || "xyz@gmail.com",
            success: (success) => {
              console.log(success);
            },
            error: (error) => {
              console.log(error);
            },
          });
        },
        error: (error) => {
          console.log(error);
        },
      });
    }

    // Only call startMeeting if all necessary parameters are present
    if (sign && meetingId && name && email) {
      // console.log(sign);
      // console.log(meetingId);
      // console.log(password);
      startMeeting(sign);
    } else {
      console.error("Missing meeting parameters.");
    }
  }, [meetingId, password, sign, email, name]);

  return <div id="zoom-meeting"></div>;
};

export default MeetingPage;
