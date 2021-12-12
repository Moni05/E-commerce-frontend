import styled from "styled-components";
import CategoryItem from "./CategoryItem";
import { categories } from "../data"

const Container = styled.div`
    display: flex;
    padding: 20px;
    justify-content: space-between;
`


const Category = () =>{

    return(
        <Container>
            {categories.map((item)=>{
                return(
                    <CategoryItem item={item} key={item.id}/>
                );
            })}
        </Container>
    );

}

export default Category;