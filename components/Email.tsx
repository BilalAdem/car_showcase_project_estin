import React from "react";

const Email = () => {
  return (
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
  );
};

export default Email;
