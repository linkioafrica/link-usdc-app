"use client";

import { logoutActions } from "@/actions/auth.actions";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";

export const LogoutModal = ({ children }: { children: React.ReactNode }) => {
  return (
    <AlertDialog>
      <AlertDialogTrigger className="w-full">{children}</AlertDialogTrigger>
      <AlertDialogContent className="space-y-3 rounded-lg">
        <AlertDialogHeader>
          <AlertDialogTitle className="text-base">
            Are you sure you want to logout?
          </AlertDialogTitle>
        </AlertDialogHeader>
        <AlertDialogFooter className="justify-between">
          <AlertDialogCancel>Dismiss</AlertDialogCancel>
          <AlertDialogAction
            className="bg-rose-600 hover:bg-rose-800"
            onClick={async () => await logoutActions()}
          >
            Logout
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};
