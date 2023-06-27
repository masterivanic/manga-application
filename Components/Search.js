import React from "react";
import { StyleSheet, View, Button, TextInput, FlatList, ActivityIndicator } from "react-native";
import FilmItem from "./FilmItem";
import { getFilmsByApi } from "../Services/TMDBApi";

class Search extends React.Component {

    constructor(props) {
        super(props)
        this.searchedText = ""
        this.page = 0
        this.totalPages = 0
        this.state = {
            films: [],
            loading: false
        }
    }

    _searchFilms() {
        this.page = 0
        this.totalPages = 0
        this.setState({
            films: []
        }, () => {
            this._loadFilms()
            this.searchedText = ""
        })
    }

    _searchTextInputChanged(text) {
        this.searchedText = text
    }

    _displayDetailForFilm = (idFilm) => {
        console.log("Display film with id " + idFilm)
        this.props.navigation.navigate("FilmDetail")
    }

    _loadFilms() {
        if (this.searchedText.length > 0) {
            this.setState({ loading: true })
            getFilmsByApi(this.searchedText, this.page + 1).then(data => {
                this.page = data.page
                this.totalPages = data.total_pages
                this.setState({
                    films: [...this.state.films, ...data.results],
                    loading: false
                })
            })
        }
    }

    _displayLoading() {
        if (this.state.loading) {
            return (
                <View style={styles.loading_container}>
                    <ActivityIndicator size='large' />
                </View>
            )
        }
    }

    render() {
        return (
            <View style={{ flex: 1, marginTop: 25 }}>
                <TextInput
                    style={styles.textinput}
                    placeholder="Titre du film"
                    onChangeText={(text) => this._searchTextInputChanged(text)}
                    onSubmitEditing={() => this._loadFilms()}
                />
                <Button style={styles.buttonStyle} title="Rechercher" onPress={() => this._searchFilms()} />
                <FlatList
                    data={this.state.films}
                    keyExtractor={(item) => item.id.toString()}
                    renderItem={({ item }) => <FilmItem film={item}
                        onEndReachedThreshold={0.5}
                        onEndReached={() => {
                            if (this.page < this.totalPages) {
                                this._loadFilms()
                            }
                        }}
                        displayDetailForFilm={this._displayDetailForFilm}
                    />}
                />
                {this._displayLoading()}
            </View>
        )
    }
}

const styles = StyleSheet.create({
    buttonStyle: {
        marginLeft: 5,
        marginRight: 5,
        paddingLeft: 5,
        height: 20,
        alignItems: 'center'
    },

    textinput: {
        marginLeft: 5,
        marginRight: 5,
        marginBottom: 5,
        height: 50,
        borderColor: '#000000',
        borderWidth: 1,
        paddingLeft: 5
    },

    loading_container: {
        position: 'absolute',
        left: 0,
        right: 0,
        top: 100,
        bottom: 0,
        alignItems: 'center',
        justifyContent: 'center'
    }
})

export default Search