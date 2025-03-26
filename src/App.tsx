import { Button, Flex, Input, Box, Text, Spinner } from "@chakra-ui/react";
import axios from "axios";
import { useState } from "react";

const baseURL = "http://localhost:3000/llm/talk";

function App() {
  const [prompt, setPrompt] = useState<string>("");
  const [response, setResponse] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);

  const handleRun = async () => {
    try {
      setLoading(true);
      setResponse("");
      const request = await axios.post(baseURL, { prompt });
      const data = request.data;
      setResponse(data);
    } catch (error) {
      alert("Something went wrong");
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Flex
      direction="column"
      align="center"
      justify="flex-start"
      gap="24px"
      minH="100vh"
      p="40px"
    >
      <Text fontSize="3xl" fontWeight="bold">
        LLM Prompt Playground
      </Text>

      <Flex gap="16px" w="100%" maxW="600px">
        <Input
          value={prompt}
          onChange={(e) => setPrompt(e.target.value)}
          placeholder="Enter your prompt..."
        />
        <Button onClick={handleRun} loading={loading} loadingText="Asking...">
          Ask
        </Button>
      </Flex>

      <Box w="100%" maxW="600px" p="20px" borderRadius="md" minH="150px">
        {loading ? (
          <Flex align="center" justify="center">
            <Spinner size="lg" />
          </Flex>
        ) : response ? (
          <Text whiteSpace="pre-wrap">{response}</Text>
        ) : (
          <Text color="gray.400">Response will appear here...</Text>
        )}
      </Box>
    </Flex>
  );
}

export default App;
