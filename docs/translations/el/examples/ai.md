# AI {#ai}

Χρησιμοποιήστε αυτό το demo με οποιονδήποτε πάροχο συμβατό με OpenAI και `/v1/chat/completions`. Τα πεδία endpoint, μοντέλου και token χρησιμοποιούνται μόνο κατά τη διάρκεια αυτής της συνεδρίας σελίδας και δεν αποθηκεύονται.

<InteractiveEditor
  ai-demo
  :items="['ai', '|', 'bold', 'italic', 'underline', '|', 'undo', 'redo']"
  placeholder="Γράψτε ή επικολλήστε κείμενο και μετά χρησιμοποιήστε το κουμπί AI της γραμμής εργαλείων..."
/>

## Λειτουργία endpoint backend {#backend-endpoint-mode}

Αλλάξτε το πεδίο **Λειτουργία** σε **Endpoint backend**, ώστε το tiptapify να επικοινωνεί απευθείας με το backend σας, χωρίς προσαρμοσμένο `aiProvider`. Στέλνει στο endpoint ένα ελάχιστο payload (`prompt`, `instruction` και τα προαιρετικά πεδία `stream`, `thinking`, `reasoning_effort`, `model`) και δέχεται απάντηση σε απλό JSON, σε `{ content }` ή σε ροή SSE — δείτε τον [οδηγό AI](/el/guide/ai#backend-generation-aiendpoint) για το πλήρες συμβόλαιο.

## Τοπικό LM Studio {#local-lm-studio}

Για το LM Studio, χρησιμοποιήστε endpoint όπως:

```txt
http://localhost:1234/v1/chat/completions
```

Αν το LM Studio εκτελείται σε άλλο μηχάνημα, χρησιμοποιήστε αντί γι' αυτό τον δικό του κεντρικό υπολογιστή, για παράδειγμα:

```txt
http://192.168.0.107:1234/v1/chat/completions
```

Για demos σε πρόγραμμα περιήγησης, χρησιμοποιήστε ένα dev proxy αν ο πάροχός σας δεν επιτρέπει CORS.
