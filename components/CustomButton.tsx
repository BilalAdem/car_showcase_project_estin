"use client"
import { CustomButtonProps } from "@/types"
import Image from "next/image"


const CustomButton = ({
    title,
    containerStyles,
    handleClick, btnType,
    rightIcon,
    textStyles,
    isDisabled

}: CustomButtonProps) => {
  return (
    <button
        disabled={false}
        type={btnType || "button"}
        className={`custom-btn ${containerStyles}`}
        onClick={handleClick}


    >
        <span className={`flex-1 ${textStyles}`}>
            {title}
        </span>
        {rightIcon && (
            <div className="flex justify-center items-center">
                <Image src={rightIcon} width={16} height={16} alt="right-arrow" />
            </div>
        )}
    </button>
  )
}

export default CustomButton