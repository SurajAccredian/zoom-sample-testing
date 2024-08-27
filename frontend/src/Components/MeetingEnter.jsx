import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { useForm } from "react-hook-form";

function MeetingEnter() {
  const [meetingType, setMeetingType] = useState("meeting");
  const navigate = useNavigate();
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
    const { meetingId, password, name, email } = data;
    const newMeetingId = meetingId.replace(/\s+/g, "");
    console.log(newMeetingId);
    console.log(data);
    console.log(meetingId);

    try {
      const role = 0;
      const exp = 1800;
      const response = await axios.post(
        "http://localhost:4000/",
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
      navigate(
        `/meeting?meetingId=${newMeetingId}&password=${password}&signature=${sign}&name=${name}&email=${email}`
      );
    } catch (error) {
      console.error("Error fetching the signature:", error.message);
    }
  };

  return (
    <section className="flex flex-col h-[100vh] justify-center items-center pt-6">
      <div className="w-full bg-white rounded-lg shadow md:mt-0 sm:max-w-md xl:p-0">
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
                Meeting ID <span className="text-red-600">*</span>
              </label>
              <input
                type="text"
                id="meetingId"
                {...register("meetingId", { required: true })}
                placeholder="Enter Meeting ID"
                className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-blue-600 focus:border-blue-600 block w-full p-2.5"
              />
              {errors.meetingId && (
                <p className="text-red-600">Meeting ID is required</p>
              )}
            </div>

            {watchMeetingType === "meeting" && (
              <>
                <div>
                  <label
                    htmlFor="password"
                    className="block mb-2 text-sm font-medium text-gray-900"
                  >
                    Passcode
                  </label>
                  <input
                    type="password"
                    id="password"
                    {...register("password")}
                    placeholder="Enter Meeting Passcode"
                    className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-blue-600 focus:border-blue-600 block w-full p-2.5"
                  />
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
              {errors.name && <p className="text-red-600">Name is required</p>}
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
              className="w-full text-white bg-blue-600 hover:bg-blue-700 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center"
            >
              Join
            </button>
          </form>
        </div>
      </div>
    </section>
  );
}

export default MeetingEnter;
