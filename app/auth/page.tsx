import {logout, SignInButton} from "@cabinid/client";

export default function Auth() {
    return (
        <div
            className="mx-5 border border-stone-200 py-10 dark:border-stone-700 sm:mx-auto sm:w-full sm:max-w-md sm:rounded-lg sm:shadow-md">
            <div className="mx-auto mt-4 w-11/12 max-w-xs sm:w-full">
               <SignInButton/>
            </div>
        </div>
    )
}