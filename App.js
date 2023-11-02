import { useRef, useState } from 'react';
import { StatusBar } from 'expo-status-bar';
import { Keyboard, StyleSheet, Text, View, TouchableWithoutFeedback, Platform } from 'react-native';
import { RadioButton, TextInput, Button } from 'react-native-paper';

export default function App() {
  const [talla, setTalla] = useState(-1);
  const [peso, setPeso] = useState(-1);
  const [sexo, setSexo] = useState('masculino');
  const [volumenTidal, setVolumenTidal] = useState(-1);
  const [peepTotal, setPeepTotal] = useState(-1);
  const [presionPlateau, setPresionPlateau] = useState(-1);
  const [frecuenciaRespiratoria, setFrecuenciaRespiratoria] = useState(-1);
  const [flujo, setFlujo] = useState(-1);
  const [presionPico, setPresionPico] = useState(-1);

  const [mecanicalPower, setMecanicalPower] = useState(0);
  const [pesoTeorico, setPesoTeorico] = useState(0);
  const [volumen_peso, setVolumen_peso] = useState(0);
  const [drivingPressure, setDrivingPressure] = useState(0);
  const [compliance, setCompliance] = useState(0);
  const [resistencia, setResistencia] = useState(0);

  const inputRef1 = useRef(null);
  const inputRef2 = useRef(null);
  const inputRef3 = useRef(null);
  const inputRef4 = useRef(null);
  const inputRef5 = useRef(null);
  const inputRef6 = useRef(null);
  const inputRef7 = useRef(null);

  const mechacalPower = () => {
    const mechPower = ((Number(volumenTidal) / 1000) * Number(frecuenciaRespiratoria)) * ((Number(presionPico) + Number(peepTotal)) + (Number(flujo) / 6)) / 20
    setMecanicalPower(mechPower)
  }

  const peso_teorico = () => {
    let pesoTeoricoFinal = 0
    if (sexo === 'masculino') {
      const pesoTeorico = 50 + 0.75 * (Number(talla) - 152.4)
      pesoTeoricoFinal = pesoTeorico
      setPesoTeorico(pesoTeorico)
    }
    else {
      const pesoTeorico = 45.5 + 0.67 * (Number(talla) - 152.4)
      pesoTeoricoFinal = pesoTeorico
      setPesoTeorico(pesoTeorico)
    }

    const volumen_peso = Number(volumenTidal) / Number(pesoTeoricoFinal)
    setVolumen_peso(volumen_peso)
  }

  const driving_pressure = () => {
    const drivingPressure = Number(presionPlateau) - Number(peepTotal)
    setDrivingPressure(drivingPressure)

    const compliance = Number(volumenTidal) / Number(drivingPressure)
    setCompliance(compliance)
  }

  const resistenciaFinal = () => {
    const resistencia = flujo - (Number(peepTotal) / Number(frecuenciaRespiratoria))

    setResistencia(resistencia)
  }

  const handleDismissKeyboard = () => {
    Keyboard.dismiss(); // Cierra el teclado
  };


  const calcular = () => {
    Keyboard.dismiss();
    mechacalPower()
    peso_teorico()
    driving_pressure()
    resistenciaFinal()
  }

  const resetAllStates = () => {
    Keyboard.dismiss();
    setTalla(-1)
    setPeso(-1)
    setSexo('masculino')
    setVolumenTidal(-1)
    setPeepTotal(-1)
    setPresionPlateau(-1)
    setFrecuenciaRespiratoria(-1)
    setFlujo(-1)
    setPresionPico(-1)
    setMecanicalPower(0.0)
    setPesoTeorico(0.0)
    setVolumen_peso(0.0)
    setDrivingPressure(0.0)
    setCompliance(0.0)
    setResistencia(0.0)
  }
  var keyReturn = 'next'
  if (Platform.OS === 'ios') {
    keyReturn = 'done'
  }
  if (Platform.OS === 'android') {
    keyReturn = 'next'
  }


  return (
    <TouchableWithoutFeedback onPress={handleDismissKeyboard}>
      <View style={styles.container}>
        <View style={styles.containerTitle} >
          <Text style={{ color: 'white', fontSize: 20 }}>CALCULADORA</Text>
          <Text style={{ color: 'white' }}>PARÁMETROS DE LA VENTILACIÓN MECÁNICA</Text>
        </View>
        <View style={{ display: 'flex', alignItems: 'center', marginTop: 20 }} >
          <View style={{ marginBottom: 10 }}>
            <RadioButton.Group onValueChange={value => setSexo(value)} value={sexo}>
              <View style={{ display: 'flex', flexDirection: 'row' }}>
                <View style={{ flexDirection: 'row', alignItems: 'center' }} >
                  <RadioButton value="masculino" />
                  <Text style={{ color: 'white' }}>Masculino</Text>
                </View>
                <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                  <RadioButton value="femenino" />
                  <Text style={{ color: 'white' }}>Femenino</Text>
                </View>
              </View>
            </RadioButton.Group>
          </View>
          <View style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', flexWrap: 'wrap', justifyContent: 'center' }}>
            <View style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', marginBottom: 5, width: '45%', padding: 5, backgroundColor: 'white', marginRight: 5, borderRadius: 4, height: 100, justifyContent: 'space-between' }}>
              <Text>Talla</Text>
              <TextInput
                label="cms"
                style={styles.textInput}
                mode='outlined'
                keyboardType="numeric"
                returnKeyType={keyReturn}
                onChangeText={(value) => setTalla(value)}
                onSubmitEditing={() => { inputRef1.current.focus(); }}
                blurOnSubmit={false}
                value={talla == -1 ? '' : talla}
              />
            </View>
            <View style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', marginBottom: 5, width: '45%', padding: 5, backgroundColor: 'white', marginRight: 5, borderRadius: 4, height: 100, justifyContent: 'space-between' }}>
              <Text>Peso</Text>
              <TextInput
                ref={inputRef1}
                label="kg"
                style={styles.textInput}
                mode='outlined'
                keyboardType="numeric"
                returnKeyType={keyReturn}
                onChangeText={(value) => setPeso(value)}
                onSubmitEditing={() => { inputRef2.current.focus(); }}
                blurOnSubmit={false}
                value={peso == -1 ? '' : peso}
              />
            </View>
            <View style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', marginBottom: 5, width: '45%', padding: 5, backgroundColor: 'white', marginRight: 5, borderRadius: 4, height: 100, justifyContent: 'space-between' }}>
              <Text>Volumen Tidal</Text>
              <TextInput
                ref={inputRef2}
                label="ml"
                style={styles.textInput}
                mode='outlined'
                keyboardType="numeric"
                returnKeyType={keyReturn}
                onSubmitEditing={() => { inputRef3.current.focus(); }}
                blurOnSubmit={false}
                onChangeText={(value) => setVolumenTidal(value)}
                value={volumenTidal == -1 ? '' : volumenTidal}
              />
            </View>
            <View style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', marginBottom: 5, width: '45%', padding: 5, backgroundColor: 'white', marginRight: 5, borderRadius: 4, height: 100, justifyContent: 'space-between' }}>
              <Text>PEEP total</Text>
              <TextInput
                ref={inputRef3}
                label="cmH2O"
                style={styles.textInput}
                mode='outlined'
                returnKeyType={keyReturn}
                onSubmitEditing={() => { inputRef4.current.focus(); }}
                blurOnSubmit={false}
                keyboardType="numeric"
                onChangeText={(value) => setPeepTotal(value)}
                value={peepTotal == -1 ? '' : peepTotal}
              />
            </View>
            <View style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', marginBottom: 5, width: '45%', padding: 5, backgroundColor: 'white', marginRight: 5, borderRadius: 4, height: 100, justifyContent: 'space-between' }}>
              <Text>Presión Plateau</Text>
              <TextInput
                ref={inputRef4}
                label="cmH2O"
                style={styles.textInput}
                mode='outlined'
                keyboardType="numeric"
                returnKeyType={keyReturn}
                onSubmitEditing={() => { inputRef5.current.focus(); }}
                blurOnSubmit={false}
                onChangeText={(value) => setPresionPlateau(value)}
                value={presionPlateau == -1 ? '' : presionPlateau}
              />
            </View>
            <View style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', marginBottom: 5, width: '45%', padding: 5, backgroundColor: 'white', marginRight: 5, borderRadius: 4, height: 100, justifyContent: 'space-between' }}>
              <Text>Frecuencia Respiratoria</Text>
              <TextInput
                ref={inputRef5}
                label="RPM"
                style={styles.textInput}
                mode='outlined'
                returnKeyType={keyReturn}
                onSubmitEditing={() => { inputRef6.current.focus(); }}
                blurOnSubmit={false}
                keyboardType="numeric"
                onChangeText={(value) => setFrecuenciaRespiratoria(value)}
                value={frecuenciaRespiratoria == -1 ? '' : frecuenciaRespiratoria}
              />
            </View>
            <View style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', marginBottom: 5, width: '45%', padding: 5, backgroundColor: 'white', marginRight: 5, borderRadius: 4, height: 100, justifyContent: 'space-between' }}>
              <Text>Flujo</Text>
              <TextInput
                ref={inputRef6}
                label="Lt/seg"
                style={styles.textInput}
                returnKeyType={keyReturn}
                onSubmitEditing={() => { inputRef7.current.focus(); }}
                blurOnSubmit={false}
                mode='outlined'
                keyboardType="numeric"
                onChangeText={(value) => setFlujo(value)}
                value={flujo == -1 ? '' : flujo}
              />
            </View>
            <View style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', marginBottom: 5, width: '45%', padding: 5, backgroundColor: 'white', marginRight: 5, borderRadius: 4, height: 100, justifyContent: 'space-between' }}>
              <Text>Presión Pico</Text>
              <TextInput
                ref={inputRef7}
                label="cmH2O"
                style={styles.textInput}
                mode='outlined'
                keyboardType="numeric"
                onChangeText={(value) => setPresionPico(value)}
                value={presionPico == -1 ? '' : presionPico}
              />
            </View>
          </View>
          <View style={{ display: 'flex', flexDirection: 'row', marginTop: 10, marginBottom: 10 }}>
            <Button mode='elevated' onPress={() => resetAllStates()} style={{ marginRight: 5 }}>
              Resetear
            </Button>
            <Button mode='elevated' onPress={() => calcular()} style={{ marginLeft: 5 }}>
              Calcular
            </Button>
          </View>
          <View>
            <Text style={{ color: 'white' }}>Mecanical Power: <Text style={{ color: 'rgb(0 255 165)' }}> {mecanicalPower == NaN ? 0 : mecanicalPower.toFixed(1)}</Text> Joules/min</Text>
            <Text style={{ color: 'white' }}>Peso teórico: <Text style={{ color: 'rgb(0 255 165)' }}>{pesoTeorico == NaN ? 0 : pesoTeorico.toFixed(1)}</Text> kg</Text>
            <Text style={{ color: 'white' }}>Volumen tidal / peso teórico: <Text style={{ color: 'rgb(0 255 165)' }}>{volumen_peso == NaN ? 0 : volumen_peso.toFixed(1)}</Text> ml/kg</Text>
            <Text style={{ color: 'white' }}>Driving pressure: <Text style={{ color: 'rgb(0 255 165)' }}> {drivingPressure == NaN ? 0 : drivingPressure.toFixed(1)}</Text> cmH2O</Text>
            <Text style={{ color: 'white' }}>Compliance: <Text style={{ color: 'rgb(0 255 165)' }}> {compliance == NaN ? 0.0 : compliance.toFixed(1)}</Text> ml/cmH20</Text>
            <Text style={{ color: 'white' }}>Resistencia: <Text style={{ color: 'rgb(0 255 165)' }}> {resistencia == NaN ? 0 : resistencia.toFixed(1)}</Text> cmH2O/lts/seg</Text>
          </View>
        </View>
        <StatusBar style="auto" />
      </View>
    </TouchableWithoutFeedback >
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#081108',
    alignItems: 'center',
    justifyContent: 'center',
    height: '100vh',
    color: 'white',
  },
  containerTitle: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  textInput: {
    fontSize: 12,
    backgroundColor: 'white',
    padding: 0,
    width: '100%',
    marginEnd: 'auto',
    height: 40,
  }

});

