import React, {Component} from 'react';
import classNames from 'classnames';
import 'bootstrap/dist/css/bootstrap-reboot.css';
import 'bootstrap/dist/css/bootstrap.css';


function FormGroupText({label, name, type = 'text', validation = {}, onChange, placeholder, value}) {
  let id = `form-id-${name}`; // 用于label.for和input.id

  return (
    <div className="form-group">
      <label htmlFor={id}>{label}</label>
      <input
        id={id}
        type={type}
        className={classNames('form-control', {'is-invalid': validation.status === false}, {'is-valid': validation.status === true})}
        name={name}
        onChange={onChange}
        placeholder={placeholder}
        value={value}
      />
      {
        validation.msg &&
        <div className="invalid-feedback">
          {validation.msg}
        </div>
      }
    </div>
  );
}


class App extends Component {

  state = {
    email: "", username: "", password: "",
    validation: {}
  };

  onInputChange = (e) => {
    const {name, value} = e.target;
    this.setState({[name]: value});
  };

  checkValidation = () => {
    let validation = {};

    if (this.state.email === "" || !this.state.email.endsWith('foxmail.com')) {
      validation.email = {status: false, msg: '钦定必须是foxmail邮箱!'};
      return [false, validation];
    } else {
      validation.email = {status: true};
    }

    if (this.state.username === "" || this.state.username.length < 5) {
      validation.username = {status: false, msg: '用户名字符必须大于5位'};
      return [false, validation];
    } else {
      validation.username = {status: true};
    }


    if (this.state.password === "" || this.state.password.length < 6) {
      validation.password = {status: false, msg: '密码必须大于6位 '};
      return [false, validation];
    } else {
      validation.password = {status: true};
    }

    return [true, validation]
  };

  onSubmit = (e) => {
    e.preventDefault(); // 阻止默认的提交的页面跳转行为
    e.stopPropagation();

    const [isValid, validation] = this.checkValidation();

    this.setState({validation});

    if (isValid) {
      // Do ajax jobs
    }
  };

  render() {
    const {validation} = this.state;
    return (
      <div className="container">
        <h2>Form Validation Demo</h2>
        {/* form 加上 noValidate 来阻止默认的浏览器的验证tooltips*/}
        <form
          method='post'
          onSubmit={this.onSubmit}
          noValidate
        >
          <FormGroupText
            label="Email"
            type="email"
            name="email"
            value={this.state.email}
            placeholder="aweffr@foxmail.com"
            onChange={this.onInputChange}
            validation={validation.email}
          />
          <FormGroupText
            label="User Name"
            type="text"
            name="username"
            value={this.state.username}
            placeholder="aweffr"
            onChange={this.onInputChange}
            validation={validation.username}
          />
          <FormGroupText
            label="Password"
            type="password"
            name="password"
            value={this.state.password}
            placeholder="Please Input Password"
            onChange={this.onInputChange}
            validation={validation.password}
          />

          <button type="submit" className="btn btn-block btn-primary">
            Submit
          </button>
        </form>
      </div>
    );
  }
}

export default App;
