import { render, fireEvent } from '@testing-library/react-native';
import PetForm from '.';

describe('PetForm', () => {
    it('allows entering a pet name', () => {
        const mockNavigation = {
            navigate: jest.fn(),
          };
          
          const { getByPlaceholderText } = render(<PetForm navigation={mockNavigation} />);
    
        const nameInput = getByPlaceholderText('Enter le nom');
        fireEvent.changeText(nameInput, 'Fido');

    
        expect(nameInput.props.value).toBe('Fido');
    });
});