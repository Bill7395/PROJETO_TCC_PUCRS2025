export const adicionarAoCarrinho = (produto) => {
  const carrinho = JSON.parse(localStorage.getItem('carrinho')) || [];
  
  const index = carrinho.findIndex(item => item.produto._id === produto._id);
  if (index !== -1) {
    carrinho[index].quantidade += 1;
  } else {
    carrinho.push({ produto, quantidade: 1, imagem: produto.imagem });
  }

  localStorage.setItem('carrinho', JSON.stringify(carrinho));
};

export const obterCarrinho = () => {
  return JSON.parse(localStorage.getItem('carrinho')) || [];
};

export const removerDoCarrinho = (produtoId) => {
  const carrinho = obterCarrinho().filter(item => item.produto._id !== produtoId);
  localStorage.setItem('carrinho', JSON.stringify(carrinho));
};

export const limparCarrinho = () => {
  localStorage.removeItem('carrinho');
};
