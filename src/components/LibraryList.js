import React, {Component} from 'react';
import {FlatList, Text} from 'react-native';
import {connect} from 'react-redux';
import ListItem from './ListItem';


class LibraryList extends Component {
    renderItem(library) {
        return <ListItem library={library} />
    }

    render () {
        console.log(this.props.jobs)

        return(
        <FlatList 
            style = {styles.flatlistStyle}
            data = {this.props.jobs}
            renderItem = {this.renderItem}
            keyExtractor = {(library) => library.key}
        />
        //<Text>Hiiiiiiiiiiiiiiii</Text>
        );
    }
}

const styles = {
    errorTextStyle: {
        fontSize: 18,
        alignSelf: 'center',
        color: 'red',
    }, 
    flatlistStyle:{
        flex: 1,
        marginTop: 15,
        paddingRight: 5,
        paddingLeft: 5,
        fontSize: 18,
        

    }
}
const mapStateToProps = state => {
    const {
        jobs, 
        latitude,
        longitude
    } = state.libraries
    return {
        jobs: jobs ,
        mylatitude : latitude,
        mylongitude : longitude
     };
};


//export default LibraryList;
export default connect(mapStateToProps)(LibraryList);