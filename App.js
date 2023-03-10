import React, { useCallback, useState, useEffect }  from 'react'
import { 
  Text, 
  SafeAreaView, 
  StyleSheet, 
  StatusBar, 
  View, 
  TouchableOpacity, 
  FlatList, 
  Modal,
  TextInput
} from 'react-native'
import { Ionicons } from '@expo/vector-icons'
import * as Animatable from 'react-native-animatable'
import AsyncStorage from '@react-native-async-storage/async-storage';

//components
import TaskItem from './src/components/TaskItem/index'

export default function App() {

  const [tasks, setTasks] = useState([])
  const [openModal, setOpenModal] = useState(false)
  const [input, setInput] = useState('')

  function handleAdd() {
    if (input === '') {
      return 
    }

    const data = {
      key: input,
      task: input
    }

    setTasks([...tasks, data])
    setOpenModal(false)
    setInput('')
  }


  const handleDelete = useCallback(data => {
    // esse handle delete eu mando como prop pro componente de task e lá dentro do componente eu uso esse handleDelete no clique do botão de feito, passando como parâmetro o data, que é esse que estamos usando aqui

    const newTasks = tasks.filter(item => item !== data)
    //nesse find ele vai retornar um array com todos items que correspem a condicional

    setTasks(newTasks)
  })

  return (
    <SafeAreaView style={ styles.container }>
      <StatusBar 
        backgroundColor={ '#171d31' }
        barStyle="light-content" //muda a cor dos ícones - tem dark-content tambem
      />
      <View>
        <Text style={ styles.title }>Minhas tarefas</Text>
      </View>

      <FlatList 
        showsHorizontalScrollIndicator={ false } //tirar barra de rolagem
        data={ tasks } //onde vão os items da lista
        keyExtractor={ (item) => item.key }//chave do item
        renderItem={ ({ item }) => <TaskItem data={ item } handleDelete={ handleDelete } />  }//o que vai renderizar
      />


      <Modal
        animationType='slide' 
        transparent={ false }
        visible={ openModal }
      >
        <SafeAreaView style={ styles.modal }>

          <View style={ styles.modalHeader }>
            <TouchableOpacity 
              onPress={() => setOpenModal(false) }
              style={ styles.backModalButton }
            >
              <Ionicons
                name='md-arrow-back'
                size={ 40 }
                color='#fff'
              />
            </TouchableOpacity>
            <Text style={ styles.modalTitle }>Nova tarefa</Text>
          </View>

          <Animatable.View 
            style={ styles.modalBody }
            animation='fadeInRight'
            useNativeDriver
          >
            <TextInput
              multiline={ true } //pra quebrar o texto quando chegar no limite do input
              autoCorrect={ false }
              placeholderTextColor='#747474'
              placeholder='O que precisa fazer hoje?'
              style={ styles.modalInput } 
              value={ input }
              onChangeText={(texto) => setInput(texto)}
            />
            <TouchableOpacity style={ styles.addButton } onPress={ handleAdd }>
              <Text style={ styles.textAddButton }>Cadastrar</Text>
            </TouchableOpacity>
            
          </Animatable.View>


        </SafeAreaView>
      </Modal>

      <TouchableOpacity style={ styles.button }
        onPress={ () => setOpenModal(true) }
      >
        <Ionicons 
          name='ios-add' 
          size={ 35 } 
          color='#fff' 
        />
      </TouchableOpacity>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  container:{
    flex: 1,
    backgroundColor: '#171d31',
  },
  title:{
    color: '#fff',
    marginTop: 20,
    marginBottom: 20,
    fontSize: 25,
    textAlign: 'center'
  },
  button:{
    position: 'absolute',
    zIndex: 9,
    elevation: 2,
    shadowColor: '#000',
    shadowOpacity: 0.5,
    shadowOffset: {
      width: 1,
      height: 2
    },
    padding: 15,
    bottom: 15,
    right: 15,
    backgroundColor: '#0094FF',
    borderRadius: 50
  },
  modal:{
    flex: 1,
    backgroundColor: '#171d31',
  },
  modalHeader: {
    marginLeft: 10,
    marginTop: 20,
    flexDirection: 'row',
    alignItems: 'center'
  },
  backModalButton: {
    marginLeft: 20
  },
  modalTitle: {
    color: '#fff',
    marginLeft: 20,
    fontSize: 25
  },
  modalBody: {
    marginTop: 15,
    justifyContent: 'center'
  },
  modalInput: {
    fontSize: 15,
    marginLeft: 10,
    marginRight: 10,
    marginBottom:30,
    backgroundColor: '#fff',
    padding: 5, 
    height: 80,
    textAlignVertical: 'top',
    color: '#000',
    borderRadius: 7
  },
  addButton: {
    backgroundColor: '#fff',
    marginTop: 10,
    marginLeft: 10,
    marginRight: 10,
    alignItems: 'center',
    juustifyContent: 'center',
    textAlign: 'center',
    padding: 10,
    borderRadius: 7
  },
  textAddButton: {
    fontSize: 20
  }
})