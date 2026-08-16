import React, { useState } from 'react';
import { StyleSheet, Text, View, ScrollView, TextInput, TouchableOpacity } from 'react-native';

export default function App() {
 
  const [nombreUsuario, setNombreUsuario] = useState(''); 
  const [edad, setEdad] = useState(''); 
  
  const [registros, setRegistros] = useState([]);

  const generarSaludo = (nombre) => {
    if (nombre === '') return 'Esperando datos...';
    return `¡Hola, ${nombre}!`;
  };

  const agregarRegistro = () => {
    if (nombreUsuario.trim() === '' || edad.trim() === '') {
      alert("Por favor ingresa nombre y edad");
      return;
    }

    const nuevoUsuario = {
      id: Date.now().toString(), 
      nombre: nombreUsuario,
      edad: parseInt(edad)
    };

    setRegistros([...registros, nuevoUsuario]);
    
    setNombreUsuario('');
    setEdad('');
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      
      <View style={styles.card}>
        <Text style={styles.heading}>Ingreso de Datos</Text>
        
        <TextInput 
          style={styles.input}
          placeholder="Escribe tu nombre"
          value={nombreUsuario}
          onChangeText={setNombreUsuario} 
        />

        <TextInput 
          style={styles.input}
          placeholder="Ingresa tu edad"
          keyboardType="numeric"
          value={edad}
          onChangeText={setEdad} 
        />

        <Text style={styles.bodyText}>{generarSaludo(nombreUsuario)}</Text>
        
        <Text style={styles.resultText}>
          Rango de edad: {edad === '' ? "---" : (parseInt(edad) >= 18 ? "Es Mayor de edad" : "Es Menor de edad")}
        </Text>

        <TouchableOpacity style={styles.button} onPress={agregarRegistro}>
          <Text style={styles.buttonText}>Guardar en el Registro</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.card}>
        <Text style={styles.heading}>Registro de Usuarios</Text>
        
        {registros.length === 0 ? (
          <Text style={styles.bodyText}>No hay usuarios registrados aún.</Text>
        ) : (
          <View style={styles.list}>
            {registros.map((item) => (
              <View key={item.id} style={styles.recordItem}>
                <Text style={styles.recordText}>
                  👤 <Text style={{fontWeight: 'bold'}}>{item.nombre}</Text>
                </Text>
                <Text style={styles.recordText}>
                  🎂 {item.edad} años - {item.edad >= 18 ? "Mayor de edad" : "Menor de edad"}
                </Text>
              </View>
            ))}
          </View>
        )}
      </View>

    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    padding: 20,
    backgroundColor: '#f0f4f8',
    paddingTop: 50, 
  },
  card: {
    backgroundColor: '#ffffff',
    padding: 20,
    borderRadius: 10,
    marginBottom: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  heading: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#2c3e50',
    marginBottom: 15,
  },
  input: {
    borderWidth: 1,
    borderColor: '#bdc3c7',
    borderRadius: 8,
    padding: 12,
    marginBottom: 10,
    fontSize: 16,
    backgroundColor: '#f8f9fa',
  },
  bodyText: {
    fontSize: 16,
    color: '#34495e',
    marginBottom: 10,
  },
  resultText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#e74c3c',
    marginBottom: 15,
  },
  button: {
    backgroundColor: '#3498db',
    padding: 15,
    borderRadius: 8,
    alignItems: 'center',
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  list: {
    marginTop: 5,
  },
  recordItem: {
    backgroundColor: '#ecf0f1',
    padding: 12,
    borderRadius: 8,
    marginBottom: 10,
    borderLeftWidth: 4,
    borderLeftColor: '#3498db',
  },
  recordText: {
    fontSize: 16,
    color: '#2c3e50',
    marginBottom: 4,
  }
});