import React from 'react';
import {Scene, Router} from 'react-native-router-flux';
import QuestionForm from './components/QuestionForm';
import QuestionFormOffer from './components/QuestionFormOffer';
import MedicalRep from './components/MedicalRep';

import AnswersForm from './components/AnswersForm';
import FindPdf from './components/FindPdf'
import Roshetat from './components/Roshetat'
import DrugSearch from './components/DrugSearch'
import SetLocation from './components/SetLocation'
import LocationForm from './components/LocationForm'


import Welcome from './components/Welcome';
import {View} from 'react-native';
const Routes = () => {
    return(
        <Router>
            <Scene key='root'>
                <Scene key='Welcome' component={Welcome} title = "DrugGo"  initial/>
                <Scene key='QuestionForm' component = {QuestionForm} title = "َابحث عن وظيفة" />
                <Scene key='QuestionFormOffer' component = {QuestionFormOffer} title = "َابحث عن موظف" />
                <Scene key='MedicalRep' component = {MedicalRep} title = "Medical Rep Job: We send for you" />

                
                <Scene key='AnswersForm' component = {AnswersForm} title = "الإعلانات الحالية" />
                <Scene key='FindPdf' component = {FindPdf} title = "أفضل تجميعات الأدوية" />
                <Scene key='Roshetat' component = {Roshetat} title = "تدريب روشتات" />
                <Scene key='DrugSearch' component = {DrugSearch} title = "الباحث السحري" />
                <Scene key='SetLocation' component = {SetLocation} title = "تحديد الموقع الجغرافي" />
                <Scene key='LocationForm' component = {LocationForm} title = "تحديد الموقع الجغرافي" />
                
            </Scene>
        </Router>
    );
};

export default Routes;