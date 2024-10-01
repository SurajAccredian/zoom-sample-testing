import { useEffect } from "react";
import { ZoomMtg } from "@zoom/meetingsdk";
import { useState } from "react";
import axios from "axios";
// import { useLocation } from "react-router-dom";
// Ensure you are using the correct version
// ZoomMtg.preLoadWasm();
// ZoomMtg.prepareJssdk();

const MeetingPage = () => {
  const [loader, setLoader] = useState(false);
  // Extract query parameters
  // const location = useLocation();
  // const queryParams = new URLSearchParams(location.search);
  // const meetingId = queryParams.get("meetingId");
  // const password = queryParams.get("password");
  // const sign = queryParams.get("signature");
  // const name = queryParams.get("name");
  // const email = queryParams.get("email");

  useEffect(() => {
    //   const getCookie = (name) => {
    //     const value = `; ${document.cookie}`;
    //     const parts = value.split(`; ${name}=`);
    //     if (parts.length === 2) return parts.pop().split(";").shift();
    //   };

    // Read the meetingData cookie
    // const meetingData = getCookie("meetingData");
    let sign = "";
    async function genrateSignature() {
      setLoader(true);
      const role = 0;
      const exp = 1800;
      const response = await axios.post(
        import.meta.env.VITE_ZOOM_BACKEND_URL,
        {
          meetingNumber: 82797903098,
          role,
          expirationSeconds: exp,
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      sign = response.data.signature;
      if (sign != "") {
        setLoader(false);
        document.getElementById("zmmtg-root").style.display = "block";
        // console.log(signature);

        ZoomMtg.init({
          leaveUrl: import.meta.env.VITE_ZOOM_FRONTEND_URL,
          patchJsMedia: true,
          leaveOnPageUnload: false,
          success: (success) => {
            console.log(success);

            ZoomMtg.join({
              signature: sign,
              sdkKey: import.meta.env.VITE_ZOOM_MEETING_SDK_KEY,
              meetingNumber: 82797903098,
              passWord: 185915,
              userName: "Dev Test user",
              userEmail: "xyz@gmail.com",

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
      } else {
        setLoader(false);
        console.error("Missing meeting parameters.");
      }
    }

    genrateSignature();

    // if (sign) {
    // const { meetingId, password, signature, name, email } =
    //   JSON.parse(meetingData);

    // function startMeeting(sign) {
    //   document.getElementById("zmmtg-root").style.display = "block";
    //   // console.log(signature);

    //   ZoomMtg.init({
    //     leaveUrl: import.meta.env.VITE_ZOOM_FRONTEND_URL,
    //     patchJsMedia: true,
    //     leaveOnPageUnload: true,
    //     success: (success) => {
    //       console.log(success);

    //       ZoomMtg.join({
    //         signature: sign,
    //         sdkKey: import.meta.env.VITE_ZOOM_MEETING_SDK_KEY,
    //         meetingNumber: 84219703438,
    //         passWord: 735617,
    //         userName: "Dummy User",
    //         userEmail: "xyz@gmail.com",
    //         success: (success) => {
    //           console.log(success);
    //         },
    //         error: (error) => {
    //           console.log(error);
    //         },
    //       });
    //     },
    //     error: (error) => {
    //       console.log(error);
    //     },
    //   });
    // }

    // Only call startMeeting if all necessary parameters are present
    // if (sign) {
    //   startMeeting(sign);
    // }
    // } else {
    //   console.error("Missing meeting parameters.");
    // }
  }, []);

  return (
    <div id="zoom-meeting">
      {loader && (
        <div className="absolute items-center w-full block bg-gray-800 bg-opacity-50 backdrop-blur-xs p-6 h-[100vh] z-40 border border-gray-100  shadow-md">
          <div
            role="status"
            className="absolute -translate-x-1/2 -translate-y-1/2 top-2/4 left-1/2"
          >
            <svg
              aria-hidden="true"
              className="w-16 h-16 text-gray-200 animate-spin dark:text-gray-600 fill-blue-600"
              viewBox="0 0 100 101"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                fill="currentColor"
              />
              <path
                d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                fill="currentFill"
              />
            </svg>
            <span className="sr-only">Loading...</span>
          </div>
        </div>
      )}
    </div>
  );
};

export default MeetingPage;
