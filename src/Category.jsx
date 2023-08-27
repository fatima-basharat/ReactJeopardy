import React from 'react'
import Clue from './Clue'
import './category.css'

function Category({category}) {
const value = [200, 400, 600, 800, 1000]

const toTitleCase = (str) => {
  return str
    .split(' ')
    .map(word => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
    .join(' ');
};

const title = toTitleCase(category.title);

  return (
    //header and 5 clues
    <div className='jeopardy-category'>
        <h2>{category.title}</h2>
        {value.map((value, index) => {
        const clue = category.clues.find((clue) => clue.value === value);
        return <Clue key={index} value={value} clue={clue} />;
      })}
    </div>

  )
}

export default Category