import React, {Component} from 'react';
import axios from 'axios';
import Footer from './Footer';

class CreateCard extends Component{

  constructor() {
    super();
    this.state = {
      question: '',
      answer: '',
    };
    this.handleFormSubmit = this.handleFormSubmit.bind(this);
    this.handleInputChange = this.handleInputChange.bind(this);
  }

  handleInputChange(e) {
    const name = e.target.name;
    const value = e.target.value;
    this.setState({
      [name]: value,
    });
  }

  handleFormSubmit(e) {
    e.preventDefault();
    // console.log(this.state);
    console.log("from createcard", this.props.state.user)
    axios.post('/decks', {
        question: this.state.question,
        answer: this.state.answer,
        user_id: this.props.state.user.id,
        // allow modified deck number later
        deckNumber: 1,
    })
    .then(res => {
      console.log(res);
      this.props.handleRedirect('/main')
    })
    .catch(err => console.log(err));
  }

  render(){
    return (
      <div className='create-card'>

      

        <h2>Create a Card!</h2>
          <div className="cards-container">
            <div className="create-front">
              <div className="create-front-side-card">
                <p>Write your question❓</p>
                <form method="POST" onSubmit={this.handleFormSubmit}>
                  <textarea
                    type="text"
                    placeholder=" "
                    name="question"
                    value={this.state.question}
                    onChange={this.handleInputChange}
                  ></textarea>

                </form>

              </div>
            </div>

            <div className="create-back">
              <div className="create-back-side-card">
                <p>Write the answer ✏️</p>
                <form method="POST" onSubmit={this.handleFormSubmit}>

                  <textarea
                  type="text"
                  placeholder=" "
                  name="answer"
                  value={this.state.answer}
                  onChange={this.handleInputChange}
                  ></textarea>

                  <input
                  className="save-back-side-card"
                  type="submit"
                  value="save"
                  onClick={this.handleFormSubmit}
                  />
                </form>


              </div>
            </div>
          </div>

        <Footer />
      </div>
    )
  }
}

export default CreateCard;
