import React, {useState, useEffect} from 'react';
import axios from 'axios';

function App() {

  const [hospitals, setHospitals] = useState([]);
  const [search, setSearch] = useState("");
  const [filteredHospitals, setFilteredHospitals] = useState([]);

  useEffect(() => {
    axios
      .get("https://dekontaminasi.com/api/id/covid19/hospitals/")
      .then((res) => {
        setHospitals(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  useEffect(() => {
    setFilteredHospitals(
      hospitals.filter((hos) =>
        hos.name.toLowerCase().includes(search.toLowerCase())
      )
    );
  }, [search, hospitals]);


  return (
    <div className="App">
        <div className = "container AidoHealth">
          <h2 className="title is-2 has-text-center">
            Hospital Search Autocomplete
          </h2>
          <div className="control"> 
            <input className = "input" type="text" placeholder="Search Hospital" onChange={(e) => setSearch(e.target.value)} />
          </div>
         
          <div className = "result">
            {filteredHospitals.map((hos) => (
              <HospitalDetail {...hos} />
            ))}
          </div>
        </div>
    </div>
  );
}

const showDetail = (hos) => {
  if (hos.phone != null) {
    alert(
      "Name : " + hos.name + "\n" +
      "Address : " + hos.address + "\n" +
      "Region : " +  hos.region + "\n" +
      "Phone : " + hos.phone + "\n" +
      "Province : " + hos.province
    );
  } else {
    alert(
      "Name : " + hos.name + "\n" +
      "Address : " + hos.address + "\n" +
      "Region : " +  hos.region + "\n" +
      "Province : " + hos.province
    );
  }
};

const HospitalDetail = (props) => {
  const { name, region, phone } = props;
  let phoneNumber;

  if (phone != null)
    phoneNumber = <span>☎️: {phone}</span>

  return (
    <>
        <div class="resultCard" onClick={() => showDetail(props)}>
          <h4 class="bolder">{name}</h4>
          <p>🏥: {region}</p>
          {phoneNumber}
        </div>
    </>
  );
};

export default App;
