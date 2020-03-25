import React from 'react'
import styled from 'styled-components'
import Button from "@material-ui/core/Button";
import { connect } from 'react-redux';
import { getTripsList, applyToTrip } from "../../Actions"

const Wrapper = styled.div`
  width: 100%;
  height: 100vh;
  gap: 10px;
  place-content: center;
  justify-items: center;
  display: grid;
`
const InputField = styled.input`
  width: 40%;
  border-radius:3px;
  /* Chrome, Safari, Edge, Opera */
  &::-webkit-outer-spin-button,
  &::-webkit-inner-spin-button {
  -webkit-appearance: none;
  margin: 0;
  }
  /* Firefox */
  &[type=number] {
    -moz-appearance: textfield;
  }
`

const createTripForm = [
  {
    name: 'name',
    label: 'Nome Completo',
    type: 'text',
    required: true,
    pattern: '.{3,}',
    title: 'Nome completo com pelo menos 3 letras'
  },
  {
    name: 'age',
    label: 'Idade',
    type: 'number',
    min: 18,
    required: true,
    title: 'Idade mínima de 18 anos'
  },
  {
    name: 'applicationText',
    label: 'Por que você deveria ser selecionado',
    type: 'text',
    pattern: '.{30,}',
    required: true,
    title: 'Sua justificativa deve ter no mínimo 30 caracteres'
  },
  {
    name: 'profession',
    label: 'Sua Profissão',
    type: 'text',
    pattern: '.{10,}',
    required: true,
    title: 'Este campo deve ter pelo menos 10 caracteres'
  },
  {
    name: 'country',
    label: 'País de origen',
    type: 'select',
    options: ["Selecione", "Afghanistan", "Albania", "Algeria", "Andorra", "Angola", "Anguilla", "Antigua &amp; Barbuda", "Argentina", "Armenia", "Aruba", "Australia", "Austria", "Azerbaijan", "Bahamas", "Bahrain", "Bangladesh", "Barbados", "Belarus", "Belgium", "Belize", "Benin", "Bermuda", "Bhutan", "Bolivia", "Bosnia &amp; Herzegovina", "Botswana", "Brazil", "British Virgin Islands", "Brunei", "Bulgaria", "Burkina Faso", "Burundi", "Cambodia", "Cameroon", "Cape Verde", "Cayman Islands", "Chad", "Chile", "China", "Colombia", "Congo", "Cook Islands", "Costa Rica", "Cote D Ivoire", "Croatia", "Cruise Ship", "Cuba", "Cyprus", "Czech Republic", "Denmark", "Djibouti", "Dominica", "Dominican Republic", "Ecuador", "Egypt", "El Salvador", "Equatorial Guinea", "Estonia", "Ethiopia", "Falkland Islands", "Faroe Islands", "Fiji", "Finland", "France", "French Polynesia", "French West Indies", "Gabon", "Gambia", "Georgia", "Germany", "Ghana", "Gibraltar", "Greece", "Greenland", "Grenada", "Guam", "Guatemala", "Guernsey", "Guinea", "Guinea Bissau", "Guyana", "Haiti", "Honduras", "Hong Kong", "Hungary", "Iceland", "India", "Indonesia", "Iran", "Iraq", "Ireland", "Isle of Man", "Israel", "Italy", "Jamaica", "Japan", "Jersey", "Jordan", "Kazakhstan", "Kenya", "Kuwait", "Kyrgyz Republic", "Laos", "Latvia", "Lebanon", "Lesotho", "Liberia", "Libya", "Liechtenstein", "Lithuania", "Luxembourg", "Macau", "Macedonia", "Madagascar", "Malawi", "Malaysia", "Maldives", "Mali", "Malta", "Mauritania", "Mauritius", "Mexico", "Moldova", "Monaco", "Mongolia", "Montenegro", "Montserrat", "Morocco", "Mozambique", "Namibia", "Nepal", "Netherlands", "Netherlands Antilles", "New Caledonia", "New Zealand", "Nicaragua", "Niger", "Nigeria", "Norway", "Oman", "Pakistan", "Palestine", "Panama", "Papua New Guinea", "Paraguay", "Peru", "Philippines", "Poland", "Portugal", "Puerto Rico", "Qatar", "Reunion", "Romania", "Russia", "Rwanda", "Saint Pierre &amp; Miquelon", "Samoa", "San Marino", "Satellite", "Saudi Arabia", "Senegal", "Serbia", "Seychelles", "Sierra Leone", "Singapore", "Slovakia", "Slovenia", "South Africa", "South Korea", "Spain", "Sri Lanka", "St Kitts &amp; Nevis", "St Lucia", "St Vincent", "St. Lucia", "Sudan", "Suriname", "Swaziland", "Sweden", "Switzerland", "Syria", "Taiwan", "Tajikistan", "Tanzania", "Thailand", "Timor L'Este", "Togo", "Tonga", "Trinidad &amp; Tobago", "Tunisia", "Turkey", "Turkmenistan", "Turks &amp; Caicos", "Uganda", "Ukraine", "United Arab Emirates", "United Kingdom", "Uruguay", "Uzbekistan", "Venezuela", "Vietnam", "Virgin Islands (US)", "Yemen", "Zambia", "Zimbabwe"],
    required: true,
    title: 'Selecione o seu pais'
  }
]

class ApplyTripPage extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      form: {}
    }
  }

  componentDidMount() {
    this.props.getTripsList();
  }

  handleFieldChange = event => {
    const { name, value } = event.target
    this.setState({
      form: {
        ...this.state.form,
        [name]: value
      }
    });
  };

  handleSubmit = e => {
    e.preventDefault()
    this.props.sendApplyForm(this.state.form)
    console.log(this.state.form)
  }

  render() {
    const { tripList } = this.props
    return (
      <Wrapper>
        <form onSubmit={this.handleSubmit}>
          {createTripForm.map(field => {
            if (field.type !== 'select') {
              return (
                <div key={field.name}>
                  <label htmlFor={field.name}>{field.label}: </label>
                  <InputField
                    id={field.name}
                    name={field.name}
                    type={field.type}
                    onChange={this.handleFieldChange}
                    pattern={field.pattern}
                    min={field.min}
                    required={field.required}
                    title={field.title}
                    value={this.state.form[field.name]}
                  />
                </div>
              )
            } else {
              return (
                <div key={field.name}>
                  <label htmlFor={field.name}>{field.label}: </label>
                  <select
                    id={field.name}
                    name={field.name}
                    onChange={this.handleFieldChange}
                    required={field.required}
                    title='Selecione o seu pais'
                    value={this.state.form[field.name]}
                  >
                    {field.options.map((option, index) => {
                      return (
                        index === 0 ?
                          <option key={index} hidden value=''>{option}</option> :
                          <option key={index} value={option}>{option}</option>
                      )
                    })}
                  </select>
                </div>
              )
            }
          })}
          <div>
            <label htmlFor='trip'>Selecione uma viagem: </label>
            <select
              id='trip'
              name='trip'
              onChange={this.handleFieldChange}
              required
              title='Selecione uma viagem'
              value={this.state.form.trip}
            >
              {tripList.length > 0 ?
                <option hidden value=''>Selecione sua Trip</option> :
                <option value=''>Carregando Viagens</option>
              }
              {tripList.length > 0 &&
                tripList.map((trip, index) => {
                  return (
                    <option key={trip.id} value={trip.id}>
                      {`${trip.name} - ${trip.planet}`}
                    </option>
                  )
                }) 
              }
            </select>
          </div>
          <Button type='submit'>Cadastrar</Button>
        </form>
      </Wrapper>
    )
  }
}

const mapStateToProps = state => ({
  tripList: state.trips.tripList
})
const mapDispatchToProps = dispatch => ({
  sendApplyForm: (form) => dispatch(applyToTrip(form)),
  getTripsList: () => dispatch(getTripsList())
})

export default connect(mapStateToProps, mapDispatchToProps)(ApplyTripPage)