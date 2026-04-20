// PizzaList.jsx - Componente de lista
import React from 'react';
import { Grid, Card, CardImage, CardTitle, CardDesc, Button } from '../styles/styles';

const PizzaList = ({ pizzas, onPizzaClick, onAddToCart }) => {
  return (
    <div>
      <Grid>
        {pizzas.map((pizza) => (
          <Card key={pizza.id} onClick={() => onPizzaClick(pizza)}>
            <CardImage src={pizza.image} alt={pizza.name} />
            <CardTitle>{pizza.name}</CardTitle>
            <CardDesc>{pizza.description}</CardDesc>
            <Button
              onClick={(e) => {
                e.stopPropagation();
                onAddToCart(pizza);
              }}
            >
              Adicionar ao carrinho
            </Button>
          </Card>
        ))}
      </Grid>
    </div>
  );
};

export default PizzaList;