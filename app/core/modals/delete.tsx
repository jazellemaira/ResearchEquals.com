import { useRouter, useMutation } from "blitz"
import { Fragment, useState } from "react"
import { Dialog, Transition } from "@headlessui/react"

import deleteUser from "app/users/mutations/deleteUser"

export default function DeleteModal() {
  let [isOpen, setIsOpen] = useState(false)
  const [deleteUserMutation] = useMutation(deleteUser)
  const router = useRouter()

  function closeModal() {
    setIsOpen(false)
  }

  function openModal() {
    setIsOpen(true)
  }

  return (
    <>
      <h3 className="text-sm font-medium text-gray-700 dark:text-gray-700">Delete your account</h3>
      <div className="flex w-11/12">
        <div className="">
          <div className="my-2 text-sm text-gray-700 dark:text-gray-700">
            <p>
              Your publication profile and publications will not be deleted if you have published.
            </p>
          </div>
        </div>
        <div className="my-2">
          <button
            type="button"
            className="px-4 py-2 border border-transparent font-medium rounded-md text-red-700 bg-red-100 hover:bg-red-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 sm:text-sm"
            onClick={openModal}
          >
            Delete
          </button>
        </div>
        <Transition appear show={isOpen} as={Fragment}>
          <Dialog as="div" className="fixed inset-0 z-10 overflow-y-auto" onClose={closeModal}>
            <div className="min-h-screen px-4 text-center">
              <Transition.Child
                as={Fragment}
                enter="ease-out duration-300"
                enterFrom="opacity-0"
                enterTo="opacity-100"
                leave="ease-in duration-200"
                leaveFrom="opacity-100"
                leaveTo="opacity-0"
              >
                <Dialog.Overlay className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
              </Transition.Child>

              {/* This element is to trick the browser into centering the modal contents. */}
              <span className="inline-block h-screen align-middle" aria-hidden="true">
                &#8203;
              </span>
              <Transition.Child
                as={Fragment}
                enter="ease-out duration-300"
                enterFrom="opacity-0 scale-95"
                enterTo="opacity-100 scale-100"
                leave="ease-in duration-200"
                leaveFrom="opacity-100 scale-100"
                leaveTo="opacity-0 scale-95"
              >
                <div className="inline-block w-full max-w-md p-6 my-8 overflow-hidden text-left align-middle transition-all transform shadow-xl rounded-2xl text-gray-900 dark:text-gray-100 bg-gray-300 dark:bg-gray-900">
                  <Dialog.Title as="h3" className="text-lg font-medium leading-6 ">
                    Confirm account deletion
                  </Dialog.Title>
                  <div className="mt-2">
                    <p className="text-sm text-gray-900">
                      Your user account will be deleted without recovery options. Your already
                      published modules will not be deleted. Your public profile will only be
                      deleted if there are no publications linked to it.
                    </p>
                  </div>

                  <div className="mt-4">
                    <button
                      type="button"
                      className="inline-flex justify-center px-4 py-2 text-sm font-medium text-green-900 bg-green-100 border border-transparent rounded-md hover:bg-green-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-green-500"
                      onClick={async () => {
                        try {
                          await deleteUserMutation()
                          router.push("/")
                        } catch (err) {
                          throw err
                        }
                      }}
                    >
                      Delete
                    </button>
                    <button
                      type="button"
                      className="inline-flex justify-center px-4 py-2 text-sm font-medium text-red-900 bg-red-100 border border-transparent rounded-md hover:bg-red-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2  mx-2 focus-visible:ring-red-500"
                      onClick={async () => {
                        setIsOpen(false)
                      }}
                    >
                      Cancel
                    </button>
                  </div>
                </div>
              </Transition.Child>
            </div>
          </Dialog>
        </Transition>
      </div>
    </>
  )
}
