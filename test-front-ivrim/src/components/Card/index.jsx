import React, { useRef, useContext, useState } from 'react';
import { useDrag, useDrop } from 'react-dnd';
import BoardContext from '../Board/context';
import UpdateButton from '../updateForm/updateButton';
import { Container, Label } from './styles';
import TaskService from '../../services/taskService';

export default function Card({ data, index, listIndex, cardUpdated, onMoveEnd }) {
  const ref = useRef();
  const [isMoved, setIsMoved] = useState(false);
  const [isDeleteConfirmationVisible, setIsDeleteConfirmationVisible] = useState(false); // Adicione o estado para controlar a exibição da confirmação

  const { move } = useContext(BoardContext);

  const [{ isDragging }, dragRef] = useDrag({
    item: { type: 'CARD', index, listIndex },
    collect: monitor => ({
      isDragging: monitor.isDragging(),
    }),
    end: (item, monitor) => {
      if (monitor.didDrop() && !isMoved) {
        setIsMoved(true);
        onMoveEnd(data, item);
      }
    },
  });

  async function deleteCard() {
    if (!isDeleteConfirmationVisible) {
      setIsDeleteConfirmationVisible(true);
    } else {
      await TaskService.deleteTask(Number(data.id));
      cardUpdated();
    }
  }

  const [, dropRef] = useDrop({
    accept: 'CARD',
    hover(item, monitor) {
      const draggedListIndex = item.listIndex;
      const targetListIndex = listIndex;

      const draggedIndex = item.index;
      const targetIndex = index;

      if (draggedIndex === targetIndex && draggedListIndex === targetListIndex) {
        return;
      }

      const targetSize = ref.current.getBoundingClientRect();
      const targetCenter = (targetSize.bottom - targetSize.top) / 2;

      const draggedOffset = monitor.getClientOffset();
      const draggedTop = draggedOffset.y - targetSize.top;

      if (draggedIndex < targetIndex && draggedTop < targetCenter) {
        return;
      }

      if (draggedIndex > targetIndex && draggedTop > targetCenter) {
        return;
      }

      move(draggedListIndex, targetListIndex, draggedIndex, targetIndex);

      item.index = targetIndex;
      item.listIndex = targetListIndex;
    }
  });

  dragRef(dropRef(ref));

  return (
    <Container ref={ref} isDragging={isDragging}>
      <header>
        <UpdateButton cardUpdated={cardUpdated} inicialCard={data}></UpdateButton>
        <button onClick={deleteCard}>
          {isDeleteConfirmationVisible ? 'Confirmar' : 'Delete'}
        </button>
      </header>
      <h2>{data.name}</h2>
      <p>{data.description}</p>
      { data.user && <img src={data.user} alt=""/> }
    </Container>
  );
}
