import useFetch from '../hooks/use-fetch';

import Section from '../UI/Section';
import TaskForm from './TaskForm';

const NewTask = (props) => {
  const { isLoading, error, sendRequest: sendTaskRequest } = useFetch();

  const createTask = (taskText, taskData) => {
    const generatedId = taskData.name;
    const newTask = {
      id: generatedId,
      text: taskText
    };
    props.onAddTask(newTask);
  };

  const enterTaskHandler = async (taskText) => {
    sendTaskRequest(
      {
        url: 'https://tasks-a0995-default-rtdb.firebaseio.com/tasks.json',
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: { text: taskText }
      },
      createTask.bind(null, taskText)
    )
  };

  return (
    <Section>
      <TaskForm onEnterTask={enterTaskHandler} loading={isLoading} />
      {error && <p>{error}</p>}
    </Section>
  );
};

export default NewTask;