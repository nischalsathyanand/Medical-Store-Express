document.getElementById("delete-medicine").addEventListener("click", function(event) {
   
    event.preventDefault();
    axios.delete("http://localhost:3000/medicines/delete/"+event.target.getAttribute('dataid'))
    .then(response =>{
      console.log(response);
      alert("DELETE THE MEDICINE");
      window.location = '/';
    })
    .catch(error => console.log(error))
  });