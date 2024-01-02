"use client";
import Image from "next/image";
import { generateCostumeCarsImageUrl } from "@/utils";
import { useRef, useState } from "react";
import { useUser } from "@clerk/nextjs";
import emailjs from "@emailjs/browser";
import toast, { Toaster } from "react-hot-toast";
import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/style.css";
import { motion, AnimatePresence } from "framer-motion";
import {
  headContainerAnimation,
  headContentAnimation,
  headTextAnimation,
  slideAnimation,
} from "@/config/motion";

const EmailPage = ({ params }: { params: { car: string[] } }) => {
  const [make, model, year] = params.car.map(decodeURIComponent);
  const [loading, setLoading] = useState(false);
  const formRef = useRef(null);

  const EMAILJS_SERVICE_ID = "service_gyvmz7j";
  const EMAILJS_TEMPLATE_ID = "template_03nqoki";
  const EMAILJS_PUBLIC_KEY = "Mu9Y-vemtD1-V35p_";
  const { user } = useUser();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    message: "",
  });
  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  console.log(formData);
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
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
          customer_email: user?.emailAddresses[0].emailAddress,
          customer_phone: formData.phone,
          message: formData.message,
        },
        EMAILJS_PUBLIC_KEY
      )
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
    <AnimatePresence>
      <div className="hero">
        <Toaster />

        <motion.section
          className="flex-1 pt-36 padding-x -mt-14"
          {...slideAnimation("left")}
        >
          <div className="Contact-card">
            <motion.div {...headContainerAnimation}>
              <motion.div {...headTextAnimation}>
                <p className="sm:text-[18px] text-[14px] text-secondary uppercase tracking-wide">
                  Get in touch
                </p>
                <h3 className="font-black md:text-[60px] sm:text-[50px] xs:text-[40px] text-[30px] text-extrabold">
                  Contact
                </h3>

                <form
                  onSubmit={handleSubmit}
                  className="max-w-md mx-auto mt-4"
                  ref={formRef}
                >
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
                      placeholder="What's your name?"
                      required
                    />
                  </div>

                  <div className="mb-4">
                    <label htmlFor="phone" className="block text-gray-600">
                      Phone Number
                    </label>
                    <PhoneInput
                      country={"dz"}
                      value={formData.phone}
                      onChange={(phone) => setFormData({ ...formData, phone })}
                      inputProps={{
                        name: "phone",
                        id: "phone",
                        className: "contact_seller_input",
                        required: true,
                        type: "tel",
                      }}
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
                      placeholder="I'm interested in the car. Please get in touch with me..."
                    />
                  </div>

                  <button
                    type="submit"
                    className="custom-btn bg-primary-blue text-white rounded-full mt-10 w-full"
                  >
                    {loading ? "Sending..." : "Send"}
                  </button>
                </form>
              </motion.div>
            </motion.div>
          </div>
        </motion.section>
        <motion.div
          className="hero__image-container relative max-w-[1440px] overflow-hidden"
          {...headContainerAnimation}
        >
          <motion.div
            className="hero__image relative h-96"
            {...headContentAnimation}
          >
            <Image
              src={generateCostumeCarsImageUrl(make, model, year)}
              alt="hero"
              fill
              className="object-contain"
            />
          </motion.div>
          <div
            className="hero__image-overlay_costum"
            style={{ top: "-4rem !important", right: "-30% !important" }}
          />
        </motion.div>
      </div>
    </AnimatePresence>
  );
};
export default EmailPage;
