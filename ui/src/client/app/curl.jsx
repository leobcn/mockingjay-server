import React from 'react';

export const Curl = React.createClass({
    componentWillMount: function () {

        let baseURL = location.origin;
        if(this.props.baseURL){
            baseURL=this.props.baseURL;
        }

        const url = `/mj-curl?name=${this.props.name}&baseURL=${baseURL}`;
        $.ajax({
            url,
            cache: false,
            success: function (data) {
                this.setState({curl: data});
            }.bind(this),
            error: function (xhr, status, err) {
                console.error(this.props.url, status, err.toString());
            }.bind(this)
        });
    },
    hint: function () {
        if(this.props.showPostHint){
            return (
                <div className="mdl-card__supporting-text hint">
                    <code>curl</code>'s default behaviour with -d is to send <code>application/x-www-form-urlencoded</code> header if no other headers are specified. MJ will not match this request unless you specify form values <strong>or</strong> the http header in the request explicitly.
                </div>
                )
        }else{
                return null;
        }
    },
    render: function () {
        if(this.state) {
            return (
                <div className="mdl-card mdl-shadow--2dp">
                    <div className="mdl-card__supporting-text">
                        <code>{this.state.curl}</code>
                    </div>
                    {this.hint()}
                </div>
            )
        } else{
            return null;
        }
    }
});