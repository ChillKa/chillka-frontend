'use client';

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from '@components/ui/alert-dialog';
import { H3 } from '@components/ui/typography';
import { Dispatch, SetStateAction } from 'react';

type DeleteQuestionDialogProps = {
  isAlertDialogOpen: boolean;
  setIsAlertDialogOpen: Dispatch<SetStateAction<boolean>>;
  handleDeleteQuestion: () => void;
};

const DeleteQuestionDialog = ({
  isAlertDialogOpen,
  setIsAlertDialogOpen,
  handleDeleteQuestion,
}: DeleteQuestionDialogProps) => {
  return (
    <AlertDialog open={isAlertDialogOpen}>
      <AlertDialogContent className="boder max-w-[32.875rem] border-primary p-0">
        <AlertDialogHeader className="p-12">
          <AlertDialogTitle />
          <AlertDialogDescription className="text-center text-primary">
            <H3>您確定要刪除此提問嗎？</H3>
            <H3>刪除後將無法復原</H3>
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter className="flex flex-row items-center">
          <AlertDialogCancel
            onClick={() => setIsAlertDialogOpen(false)}
            className="m-0 h-16 w-[50%] border-none text-base text-primary hover:bg-primary/10"
          >
            關閉
          </AlertDialogCancel>
          <AlertDialogAction
            onClick={handleDeleteQuestion}
            className="h-16 w-[50%] text-base"
          >
            刪除
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};

export default DeleteQuestionDialog;
