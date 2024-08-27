import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { useForm } from "react-hook-form";

function MeetingEnter() {
  const [meetingType, setMeetingType] = useState("meeting");
  const [loading, setLoading] = useState(false); // State for loading
  const navigate = useNavigate();
  const [loader, setLoader] = useState(false);
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm({
    defaultValues: {
      meetingType: "meeting",
    },
  });
  const watchMeetingType = watch("meetingType", "meeting");

  const onSubmit = async (data) => {
    setLoader(true);
    const { meetingId, password, name, email } = data;
    const newMeetingId = meetingId.replace(/\s+/g, "");
    console.log(newMeetingId);
    console.log(data);
    console.log(meetingId);

    setLoading(true); // Set loading to true before making the request

    try {
      const role = 0;
      const exp = 1800;
      const response = await axios.post(
        import.meta.env.VITE_ZOOM_BACKEND_URL,
        {
          meetingNumber: newMeetingId,
          role,
          expirationSeconds: exp,
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      console.log("Signature:", response.data.signature);
      const sign = response.data.signature;
      setLoader(false);
      navigate(
        `/meeting?meetingId=${newMeetingId}&password=${password}&signature=${sign}&name=${name}&email=${email}`
      );
    } catch (error) {
      console.error("Error fetching the signature:", error.message);
    } finally {
      setLoading(false); // Reset loading state after request completes
    }
  };

  return (
    <>
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

      <section className="flex flex-col h-[100vh] justify-center items-center font-sans bg-gray-50 pt-6">
        <div className="w-full bg-white backdrop-blur-sm rounded-lg shadow-2xl  sm:max-w-md xl:p-0">
          <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
            <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl">
              Join Class
            </h1>
            <form
              className="space-y-4 md:space-y-6"
              onSubmit={handleSubmit(onSubmit)}
            >
              <div className="mb-4">
                <label className="inline-flex items-center">
                  <input
                    type="radio"
                    value="meeting"
                    {...register("meetingType")}
                    className="form-radio text-blue-600"
                  />
                  <span className="ml-2">Meeting</span>
                </label>
                <label className="inline-flex items-center ml-4">
                  <input
                    type="radio"
                    value="webinar"
                    {...register("meetingType")}
                    className="form-radio text-blue-600"
                  />
                  <span className="ml-2">Webinar</span>
                </label>
              </div>

              <div>
                <label
                  htmlFor="meetingId"
                  className="block mb-2 text-sm font-medium text-gray-900"
                >
                  {watchMeetingType === "meeting" ? "Meeting ID" : "Webinar ID"}{" "}
                  <span className="text-red-600">*</span>
                </label>
                <input
                  type="text"
                  id="meetingId"
                  {...register("meetingId", { required: true })}
                  placeholder={
                    watchMeetingType === "meeting"
                      ? "Enter Meeting ID"
                      : "Enter Webinar ID"
                  }
                  className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-blue-600 focus:border-blue-600 block w-full p-2.5"
                />
                {errors.meetingId && (
                  <p className="text-red-600">
                    {" "}
                    {watchMeetingType === "meeting"
                      ? "Meeting ID"
                      : "Webinar ID"}{" "}
                  </p>
                )}
              </div>

              {watchMeetingType === "meeting" && (
                <>
                  <div>
                    <label
                      htmlFor="password"
                      className="block mb-2 text-sm font-medium text-gray-900"
                    >
                      Passcode{" "}
                      {watchMeetingType === "meeting" && (
                        <span className="text-red-600">*</span>
                      )}
                    </label>
                    <input
                      type="password"
                      id="password"
                      {...register("password", {
                        required: watchMeetingType === "meeting",
                      })}
                      placeholder={
                        watchMeetingType === "meeting"
                          ? "Enter Meeting Passcode"
                          : "Enter Webinar Passcode"
                      }
                      className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-blue-600 focus:border-blue-600 block w-full p-2.5"
                    />
                    {errors.password && watchMeetingType === "meeting" && (
                      <p className="text-red-600">Passcode is required</p>
                    )}
                  </div>
                </>
              )}

              <div>
                <label
                  htmlFor="name"
                  className="block mb-2 text-sm font-medium text-gray-900"
                >
                  Name <span className="text-red-600">*</span>
                </label>
                <input
                  type="text"
                  id="name"
                  {...register("name", { required: true })}
                  placeholder="Enter Your Name"
                  className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-blue-600 focus:border-blue-600 block w-full p-2.5"
                />
                {errors.name && (
                  <p className="text-red-600">Name is required</p>
                )}
              </div>

              <div>
                <label
                  htmlFor="email"
                  className="block mb-2 text-sm font-medium text-gray-900"
                >
                  Email <span className="text-red-600">*</span>
                </label>
                <input
                  type="email"
                  id="email"
                  {...register("email", { required: true })}
                  placeholder="Enter Your Email"
                  className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-blue-600 focus:border-blue-600 block w-full p-2.5"
                />
                {errors.email && (
                  <p className="text-red-600">Email is required</p>
                )}
              </div>

              <button
                type="submit"
                disabled={loading} // Disable button when loading
                className="w-full text-white bg-blue-600 hover:bg-blue-700 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center relative"
              >
                Join
              </button>
            </form>
          </div>
        </div>
      </section>
    </>
  );
}

export default MeetingEnter;
