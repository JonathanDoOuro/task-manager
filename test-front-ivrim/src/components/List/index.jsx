import React from 'react';

import Card from '../Card';
import Fake from '../Card/fake';
import ButtonWithForm from '../createForm/ButtonWithForm';
import { Container } from './styles';
import TaskService from '../../services/taskService';

export default function List({ data, index: listIndex, updateCards, cardUpdated }) {
  const addTaskToCards = (newTask) => {
    updateCards(newTask);
  }

  const movedComplete = async (card, item) => {
    await TaskService.updateColun(card, card.id, item.listIndex)
    //cardUpdated()
  }

  return (
    <Container done={data.done}>
      <header>
        <h2>{data.title}</h2>
        {data.creatable && (
          <>
            <ButtonWithForm addTaskToCards={addTaskToCards} ></ButtonWithForm>
          </>      
        )}
      </header>

      <ul style={{
        display: 'flex',
        flexDirection: 'column',
        height: '100%',
      }}>
        {data.cards.map((card, index) => (
          <Card 
            onMoveEnd={movedComplete}
            cardUpdated={cardUpdated}
            key={card.id} 
            listIndex={listIndex}
            index={index} 
            data={card}
          />
        ))}
        <Fake index={data.cards.length} listIndex={listIndex}/>
      </ul>
    </Container>
  );
}
