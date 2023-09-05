import React from 'react';

import { MdAdd } from 'react-icons/md';

import Card from '../Card';
import Fake from '../Card/fake';

import { Container } from './styles';

export default function List({ data, index: listIndex }) {
  return (
    <Container done={data.done}>
      <header>
        <h2>{data.title}</h2>
        {data.creatable && (
          <button type="button">
            <MdAdd size={24} color="#FFF" />
          </button>
        )}
      </header>

      <ul style={{
        display: 'flex',
        flexDirection: 'column',
        height: '100%',
      }}>
        {data.cards.map((card, index) => (
          <Card 
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
