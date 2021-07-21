import { Button, Layout, Select, SelectOptionType, Text, Modal, ModalProps } from "@ui-kitten/components";
import React from "react";
import { StyleSheet, View } from "react-native";

interface ColorPickerModalProps {
    activeColor: string;
    colorOptions: Record<string, string>,
    onColorSelect: Function,
    onClose: Function,
    visible: boolean,
}


const ColorPickerModal = (props: ColorPickerModalProps) => {

    const { activeColor, colorOptions, onColorSelect, onClose, visible } = props;

    const _colorOptions: SelectOptionType[] = Object.keys(colorOptions).map((colorName) => ({ text: colorName }));

    const defaultSelectedOption = _colorOptions.find(({ text: colorName }) => colorOptions[colorName] === activeColor) || _colorOptions[0];
    const [selectedOption, setSelectedOption] = React.useState<SelectOptionType>(defaultSelectedOption);

    const resetSelection = () => {
        setSelectedOption(defaultSelectedOption);
    }

    return (
        <Modal backdropStyle={styles.backdrop} visible={visible}>
            <Layout level='3' style={styles.modalContainer}>
                <View style={{ flexDirection: 'row' }}>
                    <Text style={{ fontSize: 18, fontWeight: 'bold', marginBottom: 8 }}>
                        Set Slider Color
                    </Text>
                </View>

                <Select
                    data={_colorOptions}
                    selectedOption={selectedOption}
                    onSelect={(option) => setSelectedOption(option as SelectOptionType)}
                    style={{ width: '100%' }}
                    onFocus={() => { }}
                    onBlur={() => { }}
                />

                <View style={{ flex: 1, flexDirection: 'row', justifyContent: 'space-between' }}>
                    <Button style={[styles.buttonHalf]} status="primary" onPress={() => {
                        onColorSelect(colorOptions[selectedOption.text]);
                        onClose()
                    }}>
                        Save
                    </Button>
                    <Button style={[styles.buttonHalf]} status="warning" onPress={() => {
                        resetSelection()
                        onClose()
                    }}>
                        Close
                    </Button>
                </View>
            </Layout>
        </Modal>
    )
}

const styles = StyleSheet.create({
    backdrop: {
        backgroundColor: 'rgba(0, 0, 0, 0.8)',
    },
    modalContainer: {
        justifyContent: 'center',
        alignItems: 'center',
        alignSelf: 'center',
        width: '90%',
        padding: 16,
        borderRadius: 5
    },
    buttonHalf: {
        width: '48%',
        marginTop: 16,
        marginHorizontal: 5
    }
});

export default ColorPickerModal;