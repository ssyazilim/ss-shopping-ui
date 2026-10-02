export const useToast = () => {
  const { $toast } = useNuxtApp()
  return $toast as typeof import("vue3-toastify").toast
}

export const useNotification = () => {
  const notify = (text: string) => {
    useToast()(`⚠️ ${text}`, {
      toastId: "composables::use-notification::toastId",
      type: "default",
      hideProgressBar: true,
    })
  }

  return { notify }
}
