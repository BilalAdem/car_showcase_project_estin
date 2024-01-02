"use client";
import { CarProps } from "@/types";
import { Fragment } from "react";
import Image from "next/image";
import { Dialog, Transition } from "@headlessui/react";
import { generateCarsImageUrl } from "@/utils";
import { CustomButton } from ".";
import { useRouter } from "next/navigation";
import { useUser } from "@clerk/nextjs";

interface CardDetailsProps {
  isOpen: boolean;
  closeModal: () => void;
  car: CarProps;
}

const CardDetails = ({ isOpen, closeModal, car }: CardDetailsProps) => {
  const router = useRouter();
  const { user } = useUser();
  const handleNavigation = () => {
    if (!user) {
      return router.push("/");
    }
    return router.push(`/car/${car.make}/${car.model}/${car.year}`);
  };
  return (
    <>
      <Transition appear show={isOpen} as={Fragment}>
        <Dialog as="div" className="relative z-10" onClose={closeModal}>
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="fixed inset-0 bg-black bg-opacity-25" />
          </Transition.Child>
          <div className="fixed inset-0 overflow-y-auto">
            <div className="flex min-h-full items-center justify-center p-4 text-center">
              <Transition.Child
                as={Fragment}
                enter="ease-out duration-300"
                enterFrom="opacity-0 scale-95"
                enterTo="opacity-100 scale-100"
                leave="ease-in duration-200"
                leaveFrom="opacity-100 scale-100"
                leaveTo="opacity-0 scale-95"
              >
                <Dialog.Panel className="w-full max-w-md transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all">
                  <button
                    type="button"
                    onClick={closeModal}
                    className="absolute top-2 right-2 p-2 w-fit bg-primary-blue-100 rounded-full z-10"
                  >
                    <Image
                      src="/close.svg"
                      width={20}
                      height={20}
                      alt="close"
                      className="cursor-pointer object-contain"
                    />
                  </button>
                  <div className="flex flex-col flex-1 gap-3">
                    <div className="relative w-full h-40 bg-pattern bg-cover bg-center rounded-lg">
                      <Image
                        src={generateCarsImageUrl(car)}
                        layout="fill"
                        objectFit="contain"
                        alt="car"
                        priority
                      />
                    </div>
                    <div className="flex gap-3">
                      <div className="flex-1 relative w-full h-24 bg-primary-blue-100 rounded-lg">
                        <Image
                          src={generateCarsImageUrl(car, "29")}
                          layout="fill"
                          objectFit="contain"
                          alt="car"
                          priority
                        />
                      </div>
                      <div className="flex-1 relative w-full h-24 bg-primary-blue-100 rounded-lg">
                        <Image
                          src={generateCarsImageUrl(car, "33")}
                          layout="fill"
                          objectFit="contain"
                          alt="car"
                          priority
                        />
                      </div>
                      <div className="flex-1 relative w-full h-24 bg-primary-blue-100 rounded-lg">
                        <Image
                          src={generateCarsImageUrl(car, "13")}
                          layout="fill"
                          objectFit="contain"
                          alt="car"
                          priority
                        />
                      </div>
                    </div>
                  </div>
                  <div className="flex flex-1 flex-col gap-2">
                    <h2 className="text-xl font-semibold capitalize">
                      {car.make} {car.model}
                    </h2>
                    <div className="mt-3 flex flex-wrap gap-4">
                      {Object.entries(car).map(([key, value]) => (
                        <div
                          className="flex justify-between gap-5 w-full text-right"
                          key={key}
                        >
                          <h4 className="text-sm font-medium capitalize text-grey">
                            {key.split("_").join(" ")}
                          </h4>
                          <p className="text-sm font-semi capitalize text-black-100">
                            {value}
                          </p>
                        </div>
                      ))}
                    </div>
                    <CustomButton
                      title="Make an offer"
                      btnType="button"
                      containerStyles="bg-primary-blue text-white rounded-full"
                      handleClick={handleNavigation}
                      rightIcon="/right-arrow.svg"
                    />
                  </div>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition>
    </>
  );
};

export default CardDetails;
