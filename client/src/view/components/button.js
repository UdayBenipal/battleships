import './components.css'
import PropTypes from 'prop-types';

const Button = ({ className, text, onClick }) => {
  return (
    <button
      className={`btn ${className}`}
      onClick={onClick}>
      {text}
    </button>
  )
};

Button.propTypes = {
  text: PropTypes.string,
  className: PropTypes.string,
  onClick: PropTypes.func,
}

export default Button;
