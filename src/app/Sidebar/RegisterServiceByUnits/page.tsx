
"use client"

import { useEffect, useState } from 'react';
import axios from 'axios';
import { useForm } from 'react-hook-form';
import {
    FormErrorMessage,
    FormLabel,
    FormControl,
    Input,
    Button,
    Select
} from '@chakra-ui/react';

interface Endereco {
    rua: string;
    numero: number;
    bairro: string;
    cidade: string;
    estado: string;
    cep: string;
}

interface Servico {
    id: number;
    nome: string;
    preco: number;
}

interface Horarios {
    segunda_a_sexta: string;
    sabado: string;
    domingo: string;
}

interface Barbearia {
    id: number;
    nome: string;
    endereco: Endereco;
    telefone: string;
    servicos: Servico[];
    horarios: Horarios;
}

export function HookForm() {
    const [data, setData] = useState<Barbearia[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [selectedBarbearia, setSelectedBarbearia] = useState<Barbearia | null>(null);

    const {
        handleSubmit,
        register,
        formState: { errors, isSubmitting },
    } = useForm();

    function onSubmit(values: any) {
        return new Promise((resolve) => {
            setTimeout(() => {
                alert(JSON.stringify(values, null, 2));
                resolve("ok");
            }, 3000);
        });
    }

    useEffect(() => {
        async function fetchData() {
            try {
                const response = await axios.get<Barbearia[]>('/mocks/unidade.mock.json');
                setData(response.data);
            } catch (error) {
                console.error('Erro ao buscar dados:', error);
            } finally {
                setLoading(false);
            }
        }

        fetchData();
    }, []);

    const handleChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
        const selectedId = parseInt(event.target.value, 10);
        const selected = data.find(barbearia => barbearia.id === selectedId) || null;
        setSelectedBarbearia(selected);
    };

    if (loading) return <div>Carregando...</div>;

    return (
        <form onSubmit={handleSubmit(onSubmit)} >
            <FormControl isInvalid={!!errors.name}>
                <FormLabel htmlFor='name'>Unidade</FormLabel>
                <Select
                    placeholder='Selecione uma opção'
                    {...register('barbeariaId', { required: 'Selecione uma barbearia' })}
                    onChange={handleChange}
                    size='sm'
                    width={450}
                >
                    {data.map(barbearia => (
                        <option key={barbearia.id} value={barbearia.id}>
                            {barbearia.nome}
                        </option>
                    ))}
                </Select>
                <FormErrorMessage>
                    {/* {errors.name && errors.name.message} */}
                </FormErrorMessage>
            </FormControl>
            <Button mt={4} colorScheme='teal' isLoading={isSubmitting} type='submit'>
                Submit
            </Button>
            {selectedBarbearia && (
                <div>
                    <h3>Detalhes da Barbearia</h3>
                    <p><strong>Nome:</strong> {selectedBarbearia.nome}</p>
                    <p><strong>Endereço:</strong> {selectedBarbearia.endereco.rua}, {selectedBarbearia.endereco.numero} - {selectedBarbearia.endereco.bairro}, {selectedBarbearia.endereco.cidade} - {selectedBarbearia.endereco.estado}</p>
                    <p><strong>Telefone:</strong> {selectedBarbearia.telefone}</p>
                    <p><strong>Horários:</strong> Segunda a Sexta: {selectedBarbearia.horarios.segunda_a_sexta}, Sábado: {selectedBarbearia.horarios.sabado}, Domingo: {selectedBarbearia.horarios.domingo}</p>
                </div>
            )}
        </form>
    );
}

export default HookForm;
