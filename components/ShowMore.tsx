"use client"
import { ShowMoreProps } from "@/types"
import { useRouter } from "next/navigation"
import { CustomButton } from "."
import { UpdateParams } from "@/utils"

const ShowMore = ({pageNumber , isNext}:ShowMoreProps ) => {
    const router = useRouter()
    const handleNavigation  =()=>{
        const newLimit  = (pageNumber + 1) * 10
        const newPathName = UpdateParams("limit" , newLimit.toString())
        router.push(newPathName)

    }
    return (
        <div className="flex justify-center w-full gap-5 mt-10 ">
            {!isNext && (
                <CustomButton 
                    title="Show More"
                    btnType="button"
                    containerStyles="bg-primary-blue text-white rounded-full"
                    handleClick={handleNavigation}
                     />

            )}

        </div>
    )
}

export default ShowMore