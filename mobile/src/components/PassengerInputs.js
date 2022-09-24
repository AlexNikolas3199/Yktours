import React, {useState, useEffect} from 'react';
import {StyleSheet, Text, View, TextInput} from 'react-native';
import I18n from '../languages/i18n';
import PickerWrap from './PickerWrap';

const PassengerInputs = ({
  id,
  setPassengers,
  passengers,
  foods,
  foodKids,
  setTotalPrice,
  price,
  setIsError,
  adult,
  child,
}) => {
  const data = [
    {name: I18n.t('notChosen'), value: null},
    {name: I18n.t('Passport'), value: 'Passport'},
    {name: I18n.t('zagranPassport'), value: 'zagranPassport'},
    {name: I18n.t('birthCertificate'), value: 'birthCertificate'},
  ];
  const myFood =
    id < adult
      ? foods
      : id >= adult && id < adult + child
      ? foodKids
      : [0, 0, 0, 0];
  const dada = [
    {name: I18n.t('notChosen'), value: 0},
    {name: I18n.t('buffet') + ` - ${myFood[0]} ₽`, value: myFood[0]},
    {name: I18n.t('breakfast') + ` - ${myFood[1]} ₽`, value: myFood[1]},
    {name: I18n.t('lunch') + ` - ${myFood[2]} ₽`, value: myFood[2]},
    {name: I18n.t('dinner') + ` - ${myFood[3]} ₽`, value: myFood[3]},
  ];

  const [surname, setSurname] = useState('');
  const [name, setName] = useState('');
  const [patronymic, setPatronymic] = useState('');
  const [documentType, setDocumentType] = useState(data[0]);
  const [documentNumber, setDocumentNumber] = useState('');
  const [food, setFood] = useState(dada[0]);
  const [errorDoc, setErrorDoc] = useState(false);
  const [date, setDate] = useState(new Date());

  const setData = (key, val, setSome = () => {}) => {
    let myPassengers = passengers;
    myPassengers[id][key] = val;
    setPassengers(myPassengers);
    setSome(val);
  };

  useEffect(() => {
    setData('dateOfBirth', date);
    setData('food', food.name);
  });
  useEffect(() => {
    if (
      surname &&
      name &&
      patronymic &&
      date &&
      documentType.value &&
      documentNumber
    ) {
      setData('isReady', true);
    } else setData('isReady', false);
  }, [surname, name, patronymic, date, documentType, documentNumber]);

  useEffect(() => setIsError(errorDoc), [errorDoc]);

  return (
    <View style={styles.container}>
      <Text style={styles.pretitle}>
        {I18n.t('passenger') +
          ' ' +
          (id + 1) +
          (id < adult
            ? ''
            : id >= adult && id < adult + child
            ? ' - ' + I18n.t('child')
            : ' - ' + I18n.t('children'))}
      </Text>
      <View style={styles.box}>
        <Text style={styles.title}>{I18n.t('surname')}</Text>
        <TextInput
          defaultValue={surname}
          onChangeText={p => setData('surname', p, setSurname)}
          style={styles.input}
          placeholder={I18n.t('ivanov')}
        />
      </View>
      <View style={styles.box}>
        <Text style={styles.title}>{I18n.t('name')}</Text>
        <TextInput
          defaultValue={name}
          onChangeText={p => setData('name', p, setName)}
          style={styles.input}
          placeholder={I18n.t('ivan')}
        />
      </View>
      <View style={styles.box}>
        <Text style={styles.title}>{I18n.t('patronymic')}</Text>
        <TextInput
          defaultValue={patronymic}
          onChangeText={p => setData('patronymic', p, setPatronymic)}
          style={styles.input}
          placeholder={I18n.t('ivanovich')}
        />
      </View>
      <View style={styles.box}>
        <Text style={styles.title}>{I18n.t('dateOfBirth')}</Text>
        <PickerWrap
          date
          selectedData={date}
          setSelected={date => {
            setData('dateOfBirth', date);
            setDate(date);
          }}
        />
      </View>
      <View style={styles.box}>
        <Text style={styles.title}>{I18n.t('doc')}</Text>
        <PickerWrap
          data={data}
          selectedData={documentType}
          setSelected={s => {
            setData('documentType', s.value);
            setDocumentType(s);
            setDocumentNumber('');
          }}
        />
      </View>
      <View style={styles.box}>
        <Text style={styles.title}>{I18n.t('documentSeriesNumber')}</Text>
        {errorDoc ? (
          <Text style={{color: 'red'}}>*{I18n.t('correctData')}</Text>
        ) : null}
        <TextInput
          style={styles.input}
          editable={documentType.value ? true : false}
          onBlur={() => {
            documentNumber.toString().length < 10
              ? setErrorDoc(true)
              : setErrorDoc(false);
          }}
          keyboardType={
            documentType.value === 'birthCertificate' ? 'default' : 'numeric'
          }
          maxLength={documentType.value === 'Passport' ? 10 : 9}
          placeholder={
            documentType.value === 'birthCertificate'
              ? '3АМ234567'
              : '0000 000000'
          }
          defaultValue={documentNumber}
          onChangeText={t => setData('documentNumber', t, setDocumentNumber)}
        />
      </View>
      <View style={styles.box}>
        <Text style={styles.title}>{I18n.t('food')}</Text>
        <PickerWrap
          data={dada}
          selectedData={food}
          setSelected={s => {
            setData('food', s.name);
            setFood(s);
            setTotalPrice(price - food.value + s.value);
          }}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginVertical: 20,
    marginHorizontal: 7.5,
    paddingHorizontal: 7.5,
    paddingVertical: 15,
    borderRadius: 10,
    backgroundColor: '#fff',
    shadowColor: '#000',
    elevation: 15,
  },
  box: {
    marginBottom: 7.5,
  },
  input: {
    backgroundColor: '#E5E5E5',
    borderRadius: 7,
    opacity: 0.5,
    padding: 7.5,
    fontSize: 15,
    color: '#000',
  },
  pretitle: {
    fontWeight: 'bold',
    fontSize: 27,
    lineHeight: 39,
    color: '#003C8D',
    marginBottom: 20,
  },
  title: {
    fontWeight: 'normal',
    fontSize: 20,
    lineHeight: 29,
    color: '#000000',
    marginBottom: 2,
  },
});

export default PassengerInputs;
