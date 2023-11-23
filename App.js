import React, { useState } from 'react'; 
import { 
	View, 
	Text,
  ImageBackground, 
	TextInput, 
	ScrollView, 
	TouchableOpacity, 
	Modal, 
	StyleSheet, 
} from 'react-native'; 

const App = () => { 
	 
	// Array to store notes 
	const [notes, setNotes] = useState([]); 

	// Note title 
	const [title, setTitle] = useState(""); 

	// Note description 
	const [content, setContent] = useState(""); 

	// Note visibility state 
	const [modalVisible, setModalVisible] = useState(false);
  
  // Error message state
  const [errorMessage, setErrorMessage] = useState("");

  // Background Image 
  const homeImage = require('./assets/note_background.jpeg'); 
  const newNoteImage = require('./assets/note_input_background.jpeg'); 


	// Function to handle saving a note 
	const handleSaveNote = () => { 
    if (title.trim() === "" || content.trim() === "") {
      setErrorMessage("Title and content are required!");
      return;
    }

    setErrorMessage("");
			
    // If no note is selected, add a new note 
    const newNote = { 
      id: Date.now(), 
      title, 
      content, 
    }; 
    setNotes([...notes, newNote]); 

		setTitle(""); 
		setContent(""); 
		setModalVisible(false); 
	}; 

	return ( 
    
    <ImageBackground source={homeImage} style={styles.backgroundImage}> 
      {/* Title */} 
      <Text style={styles.title}>Home Page</Text> 

      {/* Conditional rendering for notes */}
      {notes.length === 0 ? (
        <View style={styles.centeredTextContainer}>
          <Text style={styles.centeredText}>No notes here</Text>
        </View>
      ) : (
        <ScrollView style={styles.noteList}> 
          {notes.map((note) => ( 
              <View style={styles.noteContainer}>
                <Text style={styles.noteTitle}> 
                  {note.title}
                </Text> 
                <Text style={styles.noteDescription}>
                  {note.content}
                </Text>
            </View>
                
          ))} 
        </ScrollView> 
      )}

      {/* Add Note button */} 
      <TouchableOpacity 
        style={styles.newNote} 
        onPress={() => { 
          setTitle(""); 
          setContent(""); 
          setModalVisible(true); 
        }} 
      > 
        <Text style={styles.newNoteText}> 
          New Note 
        </Text> 
      </TouchableOpacity> 

      {/* Modal for creating/editing notes */} 
      <Modal 
        visible={modalVisible} 
        animationType="slide"
        transparent={false} 
      >
        <ImageBackground source={newNoteImage} style={styles.backgroundImage}>

          {/* Title */} 
          <Text style={styles.title}>New Note</Text> 

          {/* Note title input */} 
          <TextInput 
            style={styles.titleInput} 
            placeholder="Enter Title"
            placeholderTextColor="#FFFFFF"
            value={title} 
            onChangeText={setTitle} 
          /> 

          {/* Note content input */} 
          <TextInput 
            style={styles.descriptionInput} 
            multiline 
            placeholder="Enter Description"
            placeholderTextColor="#FFFFFF"
            value={content} 
            onChangeText={setContent} 
          /> 

          {/* Error message */}
          {errorMessage !== "" && (
            <Text style={styles.errorMessage}>{errorMessage}</Text>
          )}

          {/* Buttons for saving, canceling, and deleting */} 
          <View style={styles.buttonContainer}> 
            <TouchableOpacity
              style={{ backgroundColor: '#007BFF', padding: 10, borderRadius: 5, margin: 5 }}
              onPress={handleSaveNote}
            >
              <Text style={{ color: 'white', fontSize: 16, fontWeight: 'bold' }}>
                Save
              </Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={{ backgroundColor: '#FF3B30', padding: 10, borderRadius: 5, margin: 5 }}
              onPress={() => setModalVisible(false)}
            >
              <Text style={{ color: 'white', fontSize: 16, fontWeight: 'bold' }}>
                Cancel
              </Text>
            </TouchableOpacity>
          </View> 
        </ImageBackground> 
      </Modal> 
    </ImageBackground> 
	); 
}; 

const styles = StyleSheet.create({ 
	container: { 
		flex: 1, 
		padding: 40, 
		backgroundColor: "#e6e6e6", 
	}, 
	title: { 
		fontSize: 24, 
		fontWeight: "bold",
		marginBottom: 10, 
		color: "#333", 
	}, 
	noteList: { 
		flex: 1, 
	}, 
	noteTitle: { 
		fontSize: 15, 
		marginBottom: 10, 
		fontWeight: "bold",
    fontFamily: "Cochin", 
		color: "black", 
		backgroundColor: "white", 
		height: 40, 
		width: "100%", 
		padding: 10, 
		borderRadius: 8, 
	},
  noteDescription: { 
		fontSize: 8, 
		marginBottom: 10, 
		fontWeight: "bold",
    fontFamily: "Cochin",  
		color: "black", 
		backgroundColor: "white", 
		height: 40, 
		width: "100%", 
		padding: 10, 
		borderRadius: 8, 
	}, 
	newNote: { 
		alignItems: "center", 
		justifyContent: "center", 
		backgroundColor: "#00C04B", 
		paddingVertical: 12, 
		borderRadius: 5, 
		marginTop: 10, 
	}, 
	newNoteText: { 
		color: "white", 
		fontSize: 16, 
		fontWeight: "bold", 
	}, 
	modalContainer: { 
		flex: 1, 
		padding: 50, 
		backgroundColor: "white", 
	}, 
	titleInput: { 
		borderWidth: 1, 
		borderColor: "#E0E0E0", 
		padding: 10, 
		marginBottom: 10, 
		borderRadius: 5, 
	}, 
	descriptionInput: { 
		borderWidth: 1, 
		borderColor: "#E0E0E0", 
		padding: 10, 
		marginBottom: 20, 
		borderRadius: 5, 
		height: 150, 
		textAlignVertical: "top", 
	}, 
	buttonContainer: { 
		flexDirection: "row", 
		justifyContent: "space-between", 
	}, 
  centeredTextContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  centeredText: {
    fontSize: 18,
    color: '#555',
  },
  errorMessage: {
    color: "#FF3B30",
    marginBottom: 10,
    textAlign: "center",
  },
  backgroundImage: {
    flex: 1,
    padding: 40, 
    resizeMode: 'cover', 
  },
  noteContainer: {
    backgroundColor: 'white',
    borderRadius: 8,
    padding: 10,
    marginBottom: 10,
  },
}); 

export default App;

