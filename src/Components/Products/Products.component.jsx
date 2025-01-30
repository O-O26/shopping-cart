import { useState } from 'react'
import "./Product.styles.css"
import "bootstrap/dist/css/bootstrap.min.css"

const Products = () => {
    const myList = [
        {
          id: 1,
          name: "Phone",
          price: 250,
        },
        {
          id: 2,
          name: "Running Shoes",
          price: 100,
        },
        {
          id: 3,
          name: "Air Fryer",
          price: 199.99,
        },
      ]

    const [list, setList] = useState(myList)
    const [editingItemId, setEditingItemId] = useState(null);
    const [formFields, setFormFields] = useState({
        productName: "",
        price: "",
    });
    // const { productName, price } = myList;
    // const itemPrice = price.toFixed(2)
    
    const handleInputChange = (event) => {
        const { name, value } = event.target;
        setFormFields({...formFields, [name]: value});
    };
    
    const addToShoppingList = (event) => {
        event.preventDefault()
        const { productName, price } = formFields;

        if (productName.trim() !== "" && price.trim() !== "") {
            if (editingItemId) {
                // Update item if in edit mode
                setList((oldList) =>
                  oldList.map((item) =>
                    item.id === editingItemId
                      ? { ...item, name: productName, price: parseFloat(price).toFixed(2) }
                      : item
                  )
                );
                setEditingItemId(null);
            }
            else {
                const newItem = {
                // id: Date.now(), // Unique ID for the item
                id: list.length + 1, // Unique ID for the item
                name: productName,
                price: parseFloat(price).toFixed(2),
              };
              setList([...list, newItem]);
            }
          setFormFields({productName: "", price: ""}); // Clear the input field
        }
      };

    const handleEdit = (id) => {
        const itemToEdit = list.find((item) => item.id === id);
        setFormFields({
            productName: itemToEdit.name,
            price: itemToEdit.price,
        });
        setEditingItemId(id);
        };

    const deleteItem = (idToDelete) => {
        setList(list.filter((item) => {
            return(item.id !== idToDelete)
        }))
    }

    return (
        <div className="container items-container flex align-items-center">
            {/* container items-container flex align-items-center */}
            <form className="add-form" onSubmit={addToShoppingList}>
                <input type="text" name="productName" 
                value={formFields.productName} onChange={handleInputChange}
                placeholder="Product Name"/>

                <input type="number" name="price"
                value={formFields.price} onChange={handleInputChange}
                placeholder="Product price"/>
                <button type="submit" className="bg-primary-subtle rounded"
                >{editingItemId ? "Update Item" : "Add To List"}</button>
            </form>
            <table>
            {list.map((item) => {
                return(
                <tr key={item.id}>
                    <thead>
                        <th id="id">Id</th>
                        <th id="name">Name</th>
                        <th id="price">Price</th>
                    </thead>
                    <tbody>
                        <td className="item-id">{item.id}</td>
                        <td className="item-name">{item.name}</td>
                        <td className="item-price">£{item.price}</td>
                        <td>
                            <button onClick={() => handleEdit(item.id)} className="bg-info rounded edit">{}Edit</button>
                            <button onClick={() => deleteItem(item.id)} className="bg-danger rounded delete">Delete</button>
                        </td>
                    </tbody>
                </tr>
                )
            })}
            </table>
        </div>
    )
}

export default Products