import { deleteQuestion } from '@action/activity';
import DeleteQuestionDialog from '@components/AcitivyPage/QuestionsSetcion/DeleteQuestionDialog';
import { Button } from '@components/ui/button';
import { toast } from '@components/ui/use-toast';
import { useActivityContext } from '@store/ActivityProvider/ActivityProvider';
import { Trash2 } from 'lucide-react';
import { useState, useTransition } from 'react';

type DeleteQuestionButtonProps = {
  questionId: string;
};

const DeleteQuestionButton = ({ questionId }: DeleteQuestionButtonProps) => {
  const [isPending, startTransition] = useTransition();
  const [isAlertDialogOpen, setIsAlertDialogOpen] = useState(false);
  const { loadActivity, data } = useActivityContext();

  if (!data) {
    return null;
  }

  const handleDeleteQuestion = () => {
    startTransition(async () => {
      const result = await deleteQuestion(data.activity._id, questionId);
      if (result?.message !== '') {
        toast({
          title: result?.message ?? 'Unknown error',
          variant: result?.status === 'success' ? 'default' : 'destructive',
        });
      }
      if (result?.status === 'success') {
        loadActivity(data.activity._id);
        setIsAlertDialogOpen(false);
      }
    });
  };

  return (
    <>
      <DeleteQuestionDialog
        isAlertDialogOpen={isAlertDialogOpen}
        setIsAlertDialogOpen={setIsAlertDialogOpen}
        handleDeleteQuestion={handleDeleteQuestion}
      />
      <Button
        className="p-2 text-primary transition-colors hover:bg-transparent hover:text-primary/70"
        variant="ghost"
        // onClick={handleDeleteQuestion}
        onClick={() => setIsAlertDialogOpen(true)}
        disabled={isPending}
      >
        <Trash2 size={24} />
      </Button>
    </>
  );
};

export default DeleteQuestionButton;
