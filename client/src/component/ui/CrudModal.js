import React, { useEffect, useState } from 'react';
import * as Yup from 'yup';
import { useFormik } from 'formik';
import {
  Button,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  FormLabel,
  ModalFooter,
  FormControl,
  FormHelperText,
  Input,
  NumberInput,
  NumberInputField,
  NumberInputStepper,
  NumberIncrementStepper,
  NumberDecrementStepper,
} from '@chakra-ui/react';
import { addNewMovieData, updateMovieData } from '../../utils/api';

const CrudModal = ({ isOpen, isNewData, onClose, modalData }) => {
  // const [values, setValues] = useState(modalData);
  const initialRef = React.useRef();
  // console.log(modalData);
  // const handleChange = event => {
  //   setValues({
  //     ...values,
  //     [event.target.name]: event.target.value,
  //   });
  // };

  // useEffect(() => {
  //   setValues(modalData);
  // }, [modalData]);

  // const handleSubmit = ({
  //   id,
  //   movie_name,
  //   director_name,
  //   genre,
  //   rating,
  //   popularity,
  // }) => {
  //   if (isNewData) {
  //     addNewMovieData({ movie_name, director_name, genre, rating, popularity });
  //     onClose();
  //     //console.log("handleSubmit called to add values =>", {id, movie_name, director_name, genre, rating, popularity});
  //   } else {
  //     updateMovieData({
  //       id,
  //       movie_name,
  //       director_name,
  //       genre,
  //       rating,
  //       popularity,
  //     });
  //     onClose();
  //     // console.log("handleSubmit called to update values =>", {id, movie_name, director_name, genre, rating, popularity});
  //   }
  // };

  const {
    handleSubmit,
    handleBlur,
    handleChange,
    values,
    touched,
    errors,
  } = useFormik({
    initialValues: modalData,
    validationSchema: Yup.object().shape({
      movie_name: Yup.string()
        .required('Movie Name is required'),
      director_name: Yup.string()
        .required('Director Name is required'),
      genre: Yup.string()
        .required('Genre Name is required'),
    }),
    onSubmit: ({
      id,
      movie_name,
      director_name,
      genre,
      rating,
      popularity,
    }) => {
      if (isNewData) {
        addNewMovieData({ movie_name, director_name, genre, rating, popularity });
        onClose();
        console.log("handleSubmit called to add values =>", {id, movie_name, director_name, genre, rating, popularity});
      } else {
        updateMovieData({
          id,
          movie_name,
          director_name,
          genre,
          rating,
          popularity,
        });
        onClose();
        console.log("handleSubmit called to update values =>", {id, movie_name, director_name, genre, rating, popularity});
      }
    },
  });

  return (
    <>
      <Modal initialFocusRef={initialRef} isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Edit Movie Data</ModalHeader>
          <ModalCloseButton />
          <ModalBody pb={6}>
          <form className="login-form" onSubmit={handleSubmit}>
            <FormControl isInvalid={isNewData && Boolean(touched.movie_name && errors.movie_name)}>
              <FormLabel>Movie name:</FormLabel>
              <Input
                name="movie_name"
                ref={initialRef}
                isDisabled={isNewData ? false : true}
                value={values.movie_name}
                onBlur={handleBlur}
                onChange={handleChange}
              />
              <FormHelperText>{touched.movie_name && errors.movie_name}</FormHelperText>
            </FormControl>

            <FormControl mt={4}>
              <FormLabel>Directed By:</FormLabel>
              <Input
                isInvalid={Boolean(touched.director_name && errors.director_name)}
                name="director_name"
                placeholder="Enter Directed Name"
                value={values.director_name}
                onBlur={handleBlur}
                onChange={handleChange}
              />
              <FormHelperText>{touched.director_name && errors.director_name}</FormHelperText>
            </FormControl>

            <FormControl mt={4}>
              <FormLabel>Genre:</FormLabel>
              <Input
                isInvalid={Boolean(touched.genre && errors.genre)}
                name="genre"
                placeholder="Enter Genre seperated by ',' Symbol"
                value={values.genre}
                onBlur={handleBlur}
                onChange={handleChange}
              />
              <FormHelperText>{touched.genre && errors.genre}</FormHelperText>
            </FormControl>

            <FormControl mt={4}>
              <FormLabel>IMDB Score:</FormLabel>
              <NumberInput
                defaultValue={values.rating}
                precision={1}
                step={0.1}
                min={0}
                max={10}
              >
                <NumberInputField
                  name="rating"
                  value={values.rating}
                  onChange={handleChange}
                />
                <NumberInputStepper>
                  <NumberIncrementStepper />
                  <NumberDecrementStepper />
                </NumberInputStepper>
              </NumberInput>
            </FormControl>

            <FormControl mt={4}>
              <FormLabel>Popularity:</FormLabel>
              <NumberInput
                defaultValue={values.popularity}
                precision={2}
                step={0.1}
                min={0}
                max={100}
              >
                <NumberInputField
                  name="popularity"
                  value={values.popularity}
                  onChange={handleChange}
                />
                <NumberInputStepper>
                  <NumberIncrementStepper />
                  <NumberDecrementStepper />
                </NumberInputStepper>
              </NumberInput>
            </FormControl>
            </form>
          </ModalBody>

          <ModalFooter>
            <Button
              colorScheme="blue"
              mr={3}
              onClick={() => handleSubmit(values)}
            >
              Save
            </Button>
            <Button onClick={onClose}>Cancel</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};

export default CrudModal;
