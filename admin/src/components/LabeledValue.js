import styled from 'styled-components'

const View = styled.div`
    display: flex;
    flex-direction: ${(props) => (props.column ? 'column' : 'row')};
    align-items: flex-start;
    justify-content: flex-start;
    font-size: 14px;
    max-width: 600px;
    margin-bottom: 12px;

    .label {
        font-weight: 300;
        width: ${(props) => (props.column ? '100%' : '30%')};
        margin-right: 10px;
    }

    .value {
        width: ${(props) => (props.column ? '100%' : '70%')};
        white-space: pre-line;
        font-weight: 400;
        margin-top: ${(props) => (props.column ? `5px` : `0`)};
    }

    @media only screen and (max-width: 600px) {
        flex-direction: column;

        .label {
            margin-right: 0;
            margin-bottom: 3px;
            width: 100%;
        }

        .value {
            width: 100%;
        }
    }
`

const LabeledValue = ({ className, style, label, value, column, valueStyle }) => {
    return (
        <View style={style} className={className} column={column}>
            <div className="label">{label}</div>
            <div className="value" style={valueStyle}>
                {value ? value : value === 0 ? '0' : '-'}
            </div>
        </View>
    )
}

export default LabeledValue
