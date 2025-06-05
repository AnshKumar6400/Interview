import {
  Box,
  Card,
  CardContent,
  Typography,
  TextField,
  Button,
  Grid,
} from "@mui/material";
import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Apartments = () => {
  const [data, setData] = useState([]);
  const [search, setSearch] = useState("");
  const [editingId, setEditingId] = useState(null);
  const [editFormData, setEditFormData] = useState({});
  const navigate = useNavigate();

  const fetchData = async () => {
    try {
      const response = await axios.get("http://127.0.0.1:8000/api/apartments/");
      setData(response.data);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleDelete = async (id) => {
    await axios.delete(`http://127.0.0.1:8000/api/apartments/${id}`);
    fetchData();
  };

  const handleEditClick = (id) => {
    const currentItem = data.find((item) => item.id === id);
    setEditingId(id);
    setEditFormData({ ...currentItem });
  };

  const handleChange = (e) => {
    setEditFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.put(
        `http://127.0.0.1:8000/api/apartments/${editingId}/`,
        editFormData
      );
      setEditingId(null);
      setEditFormData({});
      fetchData();
    } catch (err) {
      console.log(err);
    }
  };

  const filteredData = data.filter(
    (item) =>
      item.name.toLowerCase().includes(search.toLowerCase()) ||
      item.city.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <Box sx={{ padding: 4 }}>
      <TextField
        label="Search by name or city"
        fullWidth
        variant="outlined"
        sx={{ marginBottom: 4 }}
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />
      <Grid container spacing={3}>
        {filteredData.map((item) =>
          editingId !== item.id ? (
            <Grid item xs={12} sm={6} md={4} key={item.id}>
              <Card variant="outlined">
                <CardContent>
                  <Typography variant="h6">{item.name}</Typography>
                  <Typography>Rent: ₹{item.Rent}</Typography>
                  <Typography>Bedrooms: {item.Bedroom}</Typography>
                  <Typography>Posted: {item.Posted}</Typography>
                  <Typography>City: {item.city}</Typography>
                  <Box sx={{ marginTop: 2 }}>
                    <Button onClick={() => handleEditClick(item.id)} variant="contained" sx={{ mr: 1 }}>
                      Edit
                    </Button>
                    <Button onClick={() => handleDelete(item.id)} variant="outlined" color="error">
                      Delete
                    </Button>
                  </Box>
                </CardContent>
              </Card>
            </Grid>
          ) : (
            <Grid item xs={12} sm={6} md={4} key={item.id}>
              <Card variant="outlined">
                <CardContent component="form" onSubmit={handleSubmit}>
                  <TextField
                    fullWidth
                    label="Name"
                    name="name"
                    value={editFormData.name}
                    onChange={handleChange}
                    sx={{ mb: 1 }}
                  />
                  <TextField
                    fullWidth
                    label="Rent"
                    name="Rent"
                    value={editFormData.Rent}
                    onChange={handleChange}
                    sx={{ mb: 1 }}
                  />
                  <TextField
                    fullWidth
                    label="Bedroom"
                    name="Bedroom"
                    value={editFormData.Bedroom}
                    onChange={handleChange}
                    sx={{ mb: 1 }}
                  />
                  <TextField
                    fullWidth
                    label="Posted"
                    name="Posted"
                    value={editFormData.Posted}
                    onChange={handleChange}
                    sx={{ mb: 1 }}
                  />
                  <TextField
                    fullWidth
                    label="City"
                    name="city"
                    value={editFormData.city}
                    onChange={handleChange}
                    sx={{ mb: 1 }}
                  />
                  <Box sx={{ display: "flex", justifyContent: "space-between" }}>
                    <Button variant="contained" type="submit">
                      Save
                    </Button>
                    <Button onClick={() => setEditingId(null)} variant="outlined">
                      Cancel
                    </Button>
                  </Box>
                </CardContent>
              </Card>
            </Grid>
          )
        )}
      </Grid>
    </Box>
  );
};

export default Apartments;
