"use client";
import Image from "next/image";
import { generateCostumeCarsImageUrl } from "@/utils";
import { useRef, useState } from "react";
import { useUser } from "@clerk/nextjs";
import emailjs from "@emailjs/browser";
import toast, { Toaster } from 'react-hot-toast';

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
          toast.success("Your message has been sent successfully!", {
            duration: 4000,
          });

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

          toast.error("Ahh, something went wrong. Please try again.", {
            duration: 4000,
          });
        }
      );
  };
  return (
    <div className="hero">
      <Toaster/>

      <div className="flex-1 pt-36 padding-x -mt-14">
        <h1 className='text-4xl font-extrabold'>
            Contact Seller
          </h1>

        <form onSubmit={handleSubmit} className="max-w-md mx-auto mt-4" ref={formRef}>
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
              className="contact_seller_input "
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
              className="  contact_seller_input"
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
              className="contact_seller_input  "
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
      <div className="hero__image-container relative overflow-hidden max-w-full">
        <div className="hero__image relative h-96">
          <Image
            src={generateCostumeCarsImageUrl(make, model, year)}
            alt="hero"
            fill
            className="object-contain"
          />
        </div>
        <div className="hero__image-overlay_costum" style={{top: '-4rem !important'}} />
      </div>
    </div>
  );
};
export default page;
