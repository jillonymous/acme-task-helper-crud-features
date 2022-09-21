import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Link, useLocation, useNavigate, useParams } from 'react-router-dom';
import { destroyTask, updateTask, createTask } from './store';

const Tasks = () => {
  const { tasks } = useSelector((state) => state);
  const [name, setName] = useState('');
  const [complete, setComplete] = useState(false);
  const [difficulty, setDifficulty] = useState('');
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { pathname } = useLocation();
  let filtered = tasks;
  if (pathname.startsWith('/tasks/filter')) {
    filtered = tasks.filter(
      (task) => task.difficulty === pathname.split('/')[3]
    );
  }
  const { id } = useParams();
  useEffect(() => {
    const task = tasks.find((task) => task.id === id);
    setName(task ? task.name : '');
    setComplete(task ? task.complete : false);
    setDifficulty(task ? task.difficulty : '');
  }, [tasks, id]);

  const save = (ev) => {
    ev.preventDefault();
    if (id) {
      const task = { id, name, complete, difficulty };
      dispatch(updateTask(task, navigate));
    } else {
      const task = { name, complete, difficulty };
      dispatch(createTask(task, navigate));
    }
  };

  const destroy = () => {
    dispatch(destroyTask({ id }, navigate));
  };
  return (
    <div>
      <ul>
        {filtered.map((task) => {
          return (
            <li key={task.id} className={task.complete ? 'complete' : ''}>
              <Link to={`/tasks/${task.id}`}>{task.name}</Link>
              <p>{task.description}</p>
              <p>
                Difficulty:{' '}
                <Link to={`/tasks/filter/${task.difficulty}`}>
                  {task.difficulty}
                </Link>
              </p>
            </li>
          );
        })}
      </ul>
      <form onSubmit={save}>
        <input
          type='checkbox'
          checked={complete}
          onChange={(ev) => setComplete(ev.target.checked)}
        />
        <input value={name} onChange={(ev) => setName(ev.target.value)} />
        <select
          name='difficulty'
          onChange={(ev) => setDifficulty(ev.target.value)}
        >
          <option value='Easy'>Easy</option>
          <option value='Medium'>Medium</option>
          <option value='Hard'>Hard</option>
        </select>
        <button disabled={!name}>Save</button>
      </form>
      {id ? <button onClick={destroy}>x</button> : null}
    </div>
  );
};

export default Tasks;
