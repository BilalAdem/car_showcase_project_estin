"use client";
import Image from "next/image";
import { generateCostumeCarsImageUrl } from "@/utils";
import { useRef, useState } from "react";
import { useUser } from "@clerk/nextjs";
import emailjs from "@emailjs/browser";

const page = ({ params }: { params: { car: string[] } }) => {
  const [make, model, year] = params.car.map(decodeURIComponent);
  const [loading, setLoading] = useState(false);
  const formRef = useRef(null);

  const EMAILJS_SERVICE_ID = 'service_kxrx5b5'
  const EMAILJS_TEMPLATE_ID = 'template_03nqoki'
  const EMAILJS_PUBLIC_KEY = 'Mu9Y-vemtD1-V35p_'
  const { user } = useUser();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    message: "",
  });
  console.log(user?.emailAddresses[0].emailAddress);
  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleSubmit =  (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);

    emailjs
      .send(
        EMAILJS_SERVICE_ID,
        EMAILJS_TEMPLATE_ID,
        {
          from_name: formData.name,
          to_name: "Attar Bilal",
          from_email: user?.emailAddresses[0].emailAddress,
          to_email: "billalademattar@gmail.com",
          message: formData.message,
        },
        EMAILJS_PUBLIC_KEY)
      .then(
        () => {
          setLoading(false);
          alert("Your message has been sent successfully! I'll contact you soon.");
          setFormData({
            name: "",
            email: "",
            phone: "",
            message: "",
          });
        },
        (error) => {
          setLoading(false);
          console.error(error);

          alert("Ahh, something went wrong. Please try again.");
        }
      );
  };
  return (
    <div className="hero">
      <div className="flex-1 pt-36 padding-x">
        <form onSubmit={handleSubmit} className="max-w-md mx-auto" ref={formRef}>
          <div className="mb-4">
            <label htmlFor="name" className="block text-gray-600">
              Name
            </label>
            <input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              className="mt-1 p-2 w-full border rounded-md outline-none"
              required
            />
          </div>

          <div className="mb-4">
            <label htmlFor="phone" className="block text-gray-600">
              Phone Number
            </label>
            <input
              type="tel"
              id="phone"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              className="mt-1 p-2 w-full border rounded-md outline-none"
              required
            />
          </div>

          <div className="mb-4">
            <label htmlFor="message" className="block text-gray-600">
              Message
            </label>
            <textarea
              id="message"
              name="message"
              value={formData.message}
              onChange={handleChange}
              className="mt-1 p-2 w-full border rounded-md  outline-none"
              rows={4}
              required
              style={{ resize: "none" }}
            />
          </div>

          <button
            type="submit"
            className="custom-btn bg-primary-blue text-white rounded-full mt-10 w-full"
          >
            {loading ? "Sending..." : "Send"}
          </button>
        </form>
      </div>
      <div className="hero__image-container">
        <div className="hero__image">
          <Image
            src={generateCostumeCarsImageUrl(make, model, year)}
            alt="hero"
            fill
            className="object-contain"
          />
        </div>
        <div className="hero__image-overlay" />
      </div>
    </div>
  );
};
export default page;
