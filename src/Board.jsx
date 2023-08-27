import React, { useState, useEffect } from "react";
import Category from './Category'
import './board.css'

function Board(){
    const [categories, setCategories] = useState([])


    // This useEffect hook will run once after the component is first rendered.
    useEffect(() => {
      async function fetchData() {
        let offset = Math.floor(Math.random() * 28175) + 1

        // Fetch the categories from the API.
        const categoryUrl = `http://localhost:5500/api/categories?count=6&offset=${offset}`

        const categoryResponse = await fetch(categoryUrl)
        const categoryData = await categoryResponse.json()

        // Fetch the clues for each category.   
        const categoriesWithClues = await Promise.all(categoryData.map(async (category) => {
          const clueUrl = `http://localhost:5500/api/clues?category=${category.id}`
          const clueResponse = await fetch(clueUrl)
          const clueData = await clueResponse.json()

          // Attach the clues to the category.
          return {
            ...category,
            clues: clueData,
          }
        }))
        // Put categories and clues inside of state variable
        setCategories(categoriesWithClues)
      }

      fetchData()
    }, [])

    return (
        // for as many categories as we have (6) this is going to loop through that object and create 6 category components
        <div className="jeopardy-board">
          {categories.map((category) => (
            <Category key={category.id} category={category} />
          ))}
        </div>
      );
}

export default Board