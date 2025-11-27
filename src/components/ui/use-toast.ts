/**
 * Simple toast hook that wraps notistack
 * This is a placeholder that returns a compatible API
 */

export interface ToastProps {
  title: string;
  description?: string;
  variant?: "default" | "destructive";
}

export const useToast = () => {
  const toast = (props: ToastProps) => {
    // eslint-disable-next-line no-console
    console.log("[Toast]", props.title, props.description);
    // In a real app, this would use notistack or a custom toast implementation
  };

  return { toast };
};
